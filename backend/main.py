import requests
import os
import pandas as pd
import datetime
import json


JSON_FILENAME = r'data.json'
GOOGLE_SHEETS_CASES_URL = r'https://docs.google.com/spreadsheets/d/e/2PACX-1vQo8vfq0cVnNmNs8XBXtkQzWdcL-dFDQAmoXhMrfv-L-5SaitTcADF-vI5i6DWYIKZ3eEZbLiu72x42/pub?gid=0&single=true&output=csv'
NUMBER_OF_CASES = 3
NUMBER_OF_TOPICS = 3
GOOGLE_SHEETS_SECTIONS_URL = r'https://docs.google.com/spreadsheets/d/e/2PACX-1vQo8vfq0cVnNmNs8XBXtkQzWdcL-dFDQAmoXhMrfv-L-5SaitTcADF-vI5i6DWYIKZ3eEZbLiu72x42/pub?gid=721746947&single=true&output=csv'
PRODUCTION_DOCUMENTS_OUTPUT_PATH = r'../src/assets/data/'


# Get your auth token from https://edit.laws.africa/accounts/profile/api/
INDIGO_AUTH_TOKEN = os.environ.get('INDIGO_AUTH_TOKEN')


def write_work(name, frbr_uri):
    headers = {'Authorization': f'Token {INDIGO_AUTH_TOKEN}'}
    resp = requests.get(f'https://api.laws.africa/v2{frbr_uri}/toc.json', headers=headers)
    resp.raise_for_status()
    # {"toc": [...]}
    data = resp.json()
    fix_attachment_ids(data['toc'])

    resp = requests.get(f'https://api.laws.africa/v2{frbr_uri}.html', headers=headers)
    resp.raise_for_status()
    data['body'] = resp.text
    write_json(f'{name}.json', data)


def fix_attachment_ids(toc):
    # ensure that children of attachments have scoped ids
    def rewrite(prefix, children):
        for kid in children:
            kid['id'] = prefix + '/' + kid['id']
            rewrite(prefix, kid.get('children') or [])

    for entry in toc:
        if entry['type'] == 'attachment':
            rewrite(entry['id'], entry.get('children') or [])


def main():
    cases = read_google_sheets('cases')
    topics = read_google_sheets('topics')
    write_all_documents(cases, topics)
    # write_work("constitution", "/akn/za/act/1996/constitution")
    # write_work("rules", "/akn/za/act/rules/2016/national-assembly/")


def _excel_date_to_timestamp(date):
    # TODO iso 8601
    result = datetime.datetime.strptime(date, "%d/%m/%Y").replace(tzinfo=datetime.timezone.utc).isoformat()
    return result


def process_topic(_dict):
    if _dict["topic_meaning"] == "":
        return None
    _ret = {
        "id": _dict["id"],
        "title": _dict["title"],
        "featured": bool(_dict["featured"]),
        "highlighted": bool(_dict["highlighted"]),
        "references": str(_dict["references"]).split(";\n"),
        "snippet": _dict["snippet"],
        "topic_meaning": _dict["topic_meaning"],
        "constitutional_prescriptions": _dict["constitutional_prescriptions"],
        "interpretation": _dict["interpretation"],
        "mechanism": _dict["mechanism"],
        "legislation": _dict["legislation"],
        "cases": [
            _dict["case_" + str(i+1)] for i in range(NUMBER_OF_CASES)
            if _dict["case_" + str(i+1)] != ""
            ],
        }

    return _ret


def process_case(_dict):
    """This function is the main machinery of the translation between csv and json. 
    It defines the logic for creating the JSON
    """
    result = {
        "id": _dict["id"],
        "href": _dict["href"],
        "title": _dict["title"],
        "featured": bool(_dict["featured"]),
        "highlighted": bool(_dict["highlighted"]),
        "dateOfJudgment": _excel_date_to_timestamp(_dict["dateOfJudgment (DD/MM/YYYY)"]),
        "courtName": _dict["courtName"],
        "topics": [
            _dict["topic_" + str(i+1)] for i in range(NUMBER_OF_TOPICS)
            if _dict["topic_" + str(i+1)] != ""
            ],
        "snippet": _dict["snippet"],
        "facts_and_issues": _dict["facts_and_issues"],
        "right_and_principle": _dict["right_and_principle"],
        "interpretation": _dict["interpretation"],
        "citedCases": _dict["citedCases"].split(";\n") # TODO: put in a function
    }
    return result


def read_google_sheets(content_type):
    df = fetch_csv(content_type)

    for _row in df.iterrows():
        row = _row[1]
        _dict = {
            k: v 
            for k, v in zip(df.columns, row)
            }

        if content_type == "cases":
            result = process_case(_dict)
        elif content_type == "topics":
            result = process_topic(_dict)
        else:
            raise ValueError

        if result is None:
            continue

        yield result


def write_all_documents(cases, topics):
    write_json(
            JSON_FILENAME, 
            {
                "cases": list(cases),
                "topics": list(topics)
                }
            )


def fetch_csv(content_type):
    if content_type == "cases":
        url = GOOGLE_SHEETS_CASES_URL
    elif content_type == "topics":
        url = GOOGLE_SHEETS_SECTIONS_URL
    else:
        raise ValueError(
                "Please choose a valid content type sheet to read.\n"
                f"{content_type} is not a valid selection. Choose between 'cases' and 'topics'"
                )

    df = pd.read_csv(
        url,
        sep=","
        )
    df = df.fillna("")
    return df 


def write_json(filename, content):
    stem = PRODUCTION_DOCUMENTS_OUTPUT_PATH
    leaf = filename
    path = os.path.join(stem, leaf)
    print(f"Writing to production output path: {path}")
    with open(path, "w") as f:
        f.write(json.dumps(content))


if __name__=="__main__":
    main()
