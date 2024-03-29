from copy import deepcopy

import requests
import os
import json
import re

from lxml.html.clean import Cleaner


JSON_FILENAME = r'data.json'
PRODUCTION_DOCUMENTS_OUTPUT_PATH = r'../src/assets/data/'


# Get your auth token from https://edit.laws.africa/accounts/profile/api/
INDIGO_AUTH_TOKEN = os.environ.get('INDIGO_AUTH_TOKEN')
DIRECTUS_AUTH_TOKEN = os.environ.get('DIRECTUS_AUTH_TOKEN')

LANG_3_TO_2 = {
    'eng': 'en',
    'xho': 'xh',
    'zul': 'zu',
}

cleaner = Cleaner(
    style=True,
    remove_tags=['span'],
    safe_attrs=[],
    whitelist_tags=[],
)


def write_work(name, frbr_uri):
    headers = {'Authorization': f'Token {INDIGO_AUTH_TOKEN}'}
    print(f"Getting {frbr_uri}")
    resp = requests.get(f'https://api.laws.africa/v2{frbr_uri}/.json', headers=headers)
    resp.raise_for_status()
    data = resp.json()
    # this is the most recent expression date; we'll use it to find find all language versions at this date
    date = data['expression_date']

    # first language
    languages = {LANG_3_TO_2[data['language']]: data}

    # all other languages at this date
    others = data['points_in_time'][-1]
    assert others['date'] == date
    for expr in others['expressions']:
        lang = LANG_3_TO_2[expr['language']]
        if lang not in languages:
            frbr_uri = expr['expression_frbr_uri']
            print(f"Getting {frbr_uri}")
            resp = requests.get(f'https://api.laws.africa/v2{frbr_uri}/.json', headers=headers)
            resp.raise_for_status()
            languages[lang] = resp.json()

    # fetch all the details for each language
    for lang in languages.values():
        # clean up some unnecessary data that makes this file huge
        del lang['commencements']
        del lang['points_in_time']
        del lang['amendments']

        frbr_uri = lang['expression_frbr_uri']

        # get TOC
        print(f"Getting TOC for {frbr_uri}")
        resp = requests.get(f'https://api.laws.africa/v2{frbr_uri}/toc.json', headers=headers)
        resp.raise_for_status()
        # {"toc": [...]}
        data = resp.json()
        clean_toc(data['toc'])
        lang['toc'] = data['toc']

        # get HTML
        print(f"Getting body for {frbr_uri}")
        resp = requests.get(f'https://api.laws.africa/v2{frbr_uri}.html', headers=headers)
        resp.raise_for_status()
        lang['body'] = resp.text

    write_json(f'{name}.json', languages)


def clean_toc(toc):
    # remove entries below the basic unit, and below paragraph
    def recurse(items):
        for item in items:
            if item['basic_unit'] or item['type'] == 'paragraph':
                del item['children']
            else:
                recurse(item['children'])
    recurse(toc)


def apply_translations(items, content_fields):
    for item in items['en']:
        # copy, and then overlay translations
        translations = item.pop('translations')

        for lang3, lang2 in LANG_3_TO_2.items():
            if lang2 == 'en':
                continue

            # always make a copy, in case there is no translation
            x_item = deepcopy(item)
            items.setdefault(lang2, []).append(x_item)

            for translation in translations:
                if translation['languages_code'] == lang3:
                    # copy over these fields from the translation description
                    for field in content_fields:
                        translated = translation[field]
                        if translated and translated.strip():
                            x_item[field] = translated


def read_cases():
    content_fields = ['facts_and_issues', 'right_and_principle', 'interpretation', 'snippet']
    headers = {'Authorization': f'Bearer {DIRECTUS_AUTH_TOKEN}'}
    params = {
        'fields': '*,translations.*',
    }
    resp = requests.get('https://hzc1ju79.directus.app/items/cases', headers=headers, params=params)
    resp.raise_for_status()
    cases = {
        'en': resp.json()['data']
    }

    for case in cases['en']:
        case['topics'] = []
    cases['en'].sort(key=lambda x: x['title'])

    # overlay translations
    apply_translations(cases, content_fields)

    for xlated_items in cases.values():
        for item in xlated_items:
            clean_fields(item, content_fields)

    return cases


def read_guides(cases):
    content_fields = ['snippet', 'topic_meaning', 'interpretation', 'mechanism']
    headers = {'Authorization': f'Bearer {DIRECTUS_AUTH_TOKEN}'}
    params = {
        'fields': '*,references.provisions_id,cases.cases_id,translations.*',
    }
    resp = requests.get('https://hzc1ju79.directus.app/items/guides', headers=headers, params=params)
    resp.raise_for_status()
    guides = {
        'en': resp.json()['data']
    }

    # adjust data shape
    for guide in guides['en']:
        guide['cases'] = [x['cases_id'] for x in guide['cases']]
        guide['references'] = [x['provisions_id'] for x in guide['references']]

        # back-link guides into cases
        for case_id in guide['cases']:
            for xlated_cases in cases.values():
                for case in xlated_cases:
                    if case['id'] == case_id:
                        case['topics'].append(guide['id'])

    # sort guides by the section of the text they correspond to, based on element ids; those without ids come last
    def key(guide):
        # chp_2__sec_11 -> [2, 11]
        refs = guide['references']
        if not refs:
            return [9999, guide['title']]
        return [int(x) for x in re.findall(r'\d+', refs[0])]
    guides['en'].sort(key=key)

    # overlay translations
    apply_translations(guides, ['title'] + content_fields)

    for xlated_items in guides.values():
        for item in xlated_items:
            clean_fields(item, content_fields)

    return guides


def clean_fields(obj, fields):
    for field in fields:
        if obj[field]:
            obj[field] = cleaner.clean_html(obj[field])


def main():
    cases = read_cases()
    guides = read_guides(cases)
    write_all_documents(cases, guides)
    write_work("constitution", "/akn/za/act/1996/constitution")
    # TODO: NB NB NB if this is enabled, the rules-reading code in the app must be able to handle multiple languages
    # write_work("rules", "/akn/za/act/rules/2016/national-assembly/")


def write_all_documents(cases, topics):
    write_json(
            JSON_FILENAME, 
            {
                "cases": cases,
                "topics": topics
                }
            )


def write_json(filename, content):
    stem = PRODUCTION_DOCUMENTS_OUTPUT_PATH
    leaf = filename
    path = os.path.join(stem, leaf)
    print(f"Writing to production output path: {path}")
    with open(path, "w") as f:
        f.write(json.dumps(content))


if __name__=="__main__":
    main()
