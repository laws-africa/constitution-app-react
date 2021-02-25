import lunr from "lunr";
import { constitutionRoot } from "./constitution";
import { rulesRoot } from "./rules";
import data from "../assets/data/data.json";

interface IndexedObject {
  item: any,
  id: string,
  content: string,
  title: string,
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
      item: '',
      title: title,
      id: section.id,
      content: title.toLocaleLowerCase() + text.join(' ').toLocaleLowerCase(),
    });
  });

  const lunrSearchData = lunr(function () {
    // @ts-ignore
    this.ref('id');
    // @ts-ignore
    this.ref('title');
    // @ts-ignore
    this.ref('content');
    // @ts-ignore
    this.field('title');
    // @ts-ignore
    this.field('content');
    // @ts-ignore
    this.metadataWhitelist = ['position'];

    searchData.forEach(function (doc: {}) {
      // @ts-ignore
      this.add(doc);
    }, this);
  });

  return lunrSearchData;
}

function indexCases(cases: any[]): IndexedObject[] {
  const fields = ['snippet', 'facts_and_issues', 'right_and_principle', 'interpretation', 'title'];

  return cases.map(c => {
    return {
      item: c,
      id: c.id,
      content: fields.map(f => (c[f] || '').toLocaleLowerCase()).join(' '),
      title: c.title,
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

export function searchContent(needle: string, contentType: string) {
console.log('SEARCH CONTENT IS CALLED: ', needle, contentType);
  // @ts-ignore
  const data = {
    "cases": searchableCases,
    "guides": searchableTopics,
    "constitution": searchableProvisions,
    "rules": searchableRuleProvisions,
  }[contentType];

  switch (contentType) {
    default:
      const searchResult = searchableProvisions.search(needle);
      console.log('deault SEARCH RESULTS: ', searchResult);
      return searchResult;

    case "constitution":
      const searchResultC = searchableProvisions.search(`${needle}*`);
      console.log('CONSTITUTION SEARCH RESULTS: ', searchResultC);
      return searchResultC;

    case "rules":
      const searchResultP = searchableRuleProvisions.search(needle);
      console.log('CONSTITUTION SEARCH RESULTS: ', searchResultP);
      return searchResultP;

    case "cases":
    case "guides":
      needle = needle.toLocaleLowerCase();
      return data.filter((x: IndexedObject) => x.content.includes(needle));
  }
}
