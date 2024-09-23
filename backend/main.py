import requests
import os
import json

from lxml.html.clean import Cleaner


JSON_FILENAME = r'data.json'
PRODUCTION_DOCUMENTS_OUTPUT_PATH = r'../src/assets/data/'


# Get your auth token from https://edit.laws.africa/accounts/profile/api/
INDIGO_AUTH_TOKEN = os.environ.get('INDIGO_AUTH_TOKEN')

LANG_3_TO_2 = {
    'afr': 'af',
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


def main():
    write_work("constitution", "/akn/za/act/1996/constitution")
    # TODO: NB NB NB if this is enabled, the rules-reading code in the app must be able to handle multiple languages
    # write_work("rules", "/akn/za/act/rules/2016/national-assembly/")


def write_json(filename, content):
    stem = PRODUCTION_DOCUMENTS_OUTPUT_PATH
    leaf = filename
    path = os.path.join(stem, leaf)
    print(f"Writing to production output path: {path}")
    with open(path, "w") as f:
        f.write(json.dumps(content))


if __name__=="__main__":
    main()
