import lunr from "lunr";
import { constitutionRoot } from "./constitution";
import { rulesRoot } from "./rules";
import data from "../assets/data/data.json";

interface IndexedObject {
  item: any,
  id: string,
  content: string,
}

interface LunrResult {
  ref: string,
  score: number,
  marchData: any
}

function indexAkn(html: Document): any {
  let searchData: IndexedObject[] = [];

  // everything that can contain searchable text
  const selector = '.akn-p, .akn-listIntroduction, .akn-intro, .akn-wrapUp';

  html.querySelectorAll('.akn-section').forEach((section) => {
    // gather text content
    const text: (string | null)[] = [];
    section.querySelectorAll(selector).forEach(elem => {
      text.push(elem.textContent);
    });
    let titleSelector = section.querySelector('h3');
    let title = (titleSelector ? titleSelector.textContent : "") || "";

    searchData.push({
      item: {
        id: section.id,
        title: title,
        children: []
      },
      id: section.id,
      content: title.toLocaleLowerCase() + text.join(' ').toLocaleLowerCase(),
    });
  });

  const lunrSearchData = lunr(function () {
    // @ts-ignore
    this.ref('id');
    // @ts-ignore
    this.field('item.title');
    // @ts-ignore
    this.field('content');

    searchData.forEach(function (doc: {}) {
      // @ts-ignore
      this.add(doc);
    }, this);
  });

  return {
    lunrSearch: lunrSearchData,
    data: searchData
  };
}

function indexCases(cases: any[]): IndexedObject[] {
  const fields = ['snippet', 'facts_and_issues', 'right_and_principle', 'interpretation', 'title'];

  return cases.map(c => {
    return {
      item: c,
      id: c.id,
      content: fields.map(f => (c[f] || '').toLocaleLowerCase()).join(' ')
    };
  });
}

function indexTopics(topics: any[]) {
  const fields = ['snippet', 'topic_meaning', 'interpretation', 'mechanism', 'legislation', 'title'];

  return topics.map(t => {
    return {
      item: t,
      id: t.id,
      content: fields.map(f => (t[f] || '').toLocaleLowerCase()).join(' '),
    };
  });
}

const searchableProvisions = indexAkn(constitutionRoot);
const searchableRuleProvisions = indexAkn(rulesRoot);
const searchableCases = indexCases(data.cases);
const searchableTopics = indexTopics(data.topics);

function searchLunr (needle: string, searchIn: string = 'constitution') {
  const { lunrSearch, data } = searchableProvisions;
  const lunrResults = lunrSearch.search(needle);
  const results: IndexedObject[] = [];
  const secIds: string[] = [];

  lunrResults.forEach((result: LunrResult) => {
    secIds.push(result.ref);
  });

  secIds.forEach((section: string) => {
    const result = data.find((item: any) => item.id === section);

    if (result) {
      results.push(result);
    }
  });

  return results;
}

export function searchContent(needle: string, contentType: string) {
  // @ts-ignore
  const data = {
    "cases": searchableCases,
    "guides": searchableTopics,
    "constitution": searchableProvisions,
    "rules": searchableRuleProvisions,
  }[contentType];

  switch (contentType) {
    default:
      const searchResult = searchableProvisions.lunrSearch.search(needle);
      return searchResult;

    case "constitution":
      const searchResultC = searchLunr(needle);
      return searchResultC;

    case "rules":
      const searchResultP = searchableRuleProvisions.search(needle);
      return searchResultP;

    case "cases":
    case "guides":
      needle = needle.toLocaleLowerCase();
      return data.filter((x: IndexedObject) => x.content.includes(needle));
  }
}
