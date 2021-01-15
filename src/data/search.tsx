import { constitutionRoot } from "./constitution";
import { rulesRoot } from "./rules";
import data from "../assets/data/data.json";

interface IndexedObject {
  item: any,
  id: string,
  content: string,
}

function indexAkn(html: Document): IndexedObject[] {
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
        children: [],
      },
      id: section.id,
      content: title.toLocaleLowerCase() + text.join(' ').toLocaleLowerCase(),
    });
  });

  return searchData;
}

function indexCases(cases: any[]): IndexedObject[] {
  const fields = ['snippet', 'facts_and_issues', 'right_and_principle', 'interpretation', 'title'];

  return cases.map(c => {
    return {
      item: c,
      id: c.id,
      content: fields.map(f => (c[f] || '').toLocaleLowerCase()).join(' '),
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
  needle = needle.toLocaleLowerCase();
  // @ts-ignore
  const data = {
    "cases": searchableCases,
    "guides": searchableTopics,
    "constitution": searchableProvisions,
    "rules": searchableRuleProvisions,
  }[contentType];

  return data.filter((x: IndexedObject) => x.content.includes(needle));
}
