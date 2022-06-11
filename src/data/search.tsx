import lunr from "lunr";
import { getExpression } from "./constitution";
import { rulesRoot } from "./rules";
import {getGuides} from "./guides";
import {getCases} from "./cases";

interface IndexedObject {
  item: any;
  id: string;
  content: string;
}

interface LunrResult {
  ref: string;
  score: number;
  matchData: any;
}

function indexAkn(html: Document): any {
  let searchData: IndexedObject[] = [];

  // everything that can contain searchable text
  const selector = ".akn-p, .akn-listIntroduction, .akn-intro, .akn-wrapUp";

  html.querySelectorAll(".akn-section").forEach((section) => {
    // gather text content
    const text: (string | null)[] = [];
    section.querySelectorAll(selector).forEach((elem) => {
      text.push(elem.textContent);
    });
    let titleSelector = section.querySelector("h3");
    let title = (titleSelector ? titleSelector.textContent : "") || "";

    searchData.push({
      item: {
        id: section.id,
        title: title,
        children: [],
      },
      id: section.id,
      content: text.join(" ").toLocaleLowerCase(),
    });
  });

  const lunrSearchData = lunr(function () {
    // @ts-ignore
    this.ref("id");
    // @ts-ignore
    this.field("item.title");
    // @ts-ignore
    this.field("content");

    searchData.forEach(function (doc: {}) {
      // @ts-ignore
      this.add(doc);
    }, this);
  });

  return {
    lunrSearch: lunrSearchData,
    data: searchData,
  };
}

function indexCases(cases: any[]) {
  const fields = [
    "snippet",
    "facts_and_issues",
    "right_and_principle",
    "interpretation",
  ];

  const searchData = cases.map((c) => {
    return {
      item: c,
      id: c.id,
      title: c.title,
      content: fields.map((f) => (c[f] || "").toLocaleLowerCase()).join(" "),
    };
  });

  const lunrSearchData = lunr(function () {
    // @ts-ignore
    this.ref("id");
    // @ts-ignore
    this.field("title");
    // @ts-ignore
    this.field("content");

    searchData.forEach(function (doc: {}) {
      // @ts-ignore
      this.add(doc);
    }, this);
  });

  return {
    lunrSearch: lunrSearchData,
    data: searchData,
  };
}

function indexTopics(topics: any[]) {
  const fields = [
    "snippet",
    "topic_meaning",
    "interpretation",
    "mechanism",
    "legislation",
  ];

  const searchData = topics.map((t) => {
    return {
      item: t,
      id: t.id,
      title: t.title,
      content: fields.map((f) => (t[f] || "").toLocaleLowerCase()).join(" "),
    };
  });

  const lunrSearchData = lunr(function () {
    // @ts-ignore
    this.ref("id");
    // @ts-ignore
    this.field("title");
    // @ts-ignore
    this.field("content");

    searchData.forEach(function (doc: {}) {
      // @ts-ignore
      this.add(doc);
    }, this);
  });

  return {
    lunrSearch: lunrSearchData,
    data: searchData,
  };
}

export function findTopicsByProvisionId(id: string) {
  const guides = getGuides(localStorage.getItem('locale') || 'en')
  return guides.filter((topic: { references: string | string[]; }) => topic.references.includes(id))
}

const searchableRuleProvisions = indexAkn(rulesRoot);

function searchLunr(needle: string, searchIn: string = "constitution") {
  if (needle.length < 2) {
    return [];
  }

  let lunrSearch: any = null;
  let data: IndexedObject[] = [];

  const constitution = getExpression(localStorage.getItem('locale') || 'en');
  const searchableTopics = indexTopics(getGuides(localStorage.getItem('locale') || 'en'));
  const searchableCases = indexCases(getCases(localStorage.getItem('locale') || 'en'));
  const searchableProvisions = indexAkn(constitution.document);

  switch (searchIn) {
    default:
      lunrSearch = searchableProvisions.lunrSearch;
      data = [...searchableProvisions.data];
      break;

    case "constitution":
      lunrSearch = searchableProvisions.lunrSearch;
      data = [...searchableProvisions.data];
      break;

    case "rules":
      lunrSearch = searchableRuleProvisions.lunrSearch;
      data = [...searchableRuleProvisions.data];
      break;

    case "cases":
      lunrSearch = searchableCases.lunrSearch;
      data = [...searchableCases.data];
      break;

    case "guides":
      lunrSearch = searchableTopics.lunrSearch;
      data = [...searchableTopics.data];
      break;
  }

  const lunrResults = lunrSearch.search(needle);
  const results: IndexedObject[] = [];

  lunrResults.forEach((result: LunrResult) => {
    const item = data.find((item: any) => item.id === result.ref);

    if (item) {
      results.push(item);
    }
  });

  return results;
}

export function searchContent(needle: string, contentType: string) {
  return searchLunr(needle, contentType);
}

export function searchTopics(id: string) {
  const guides = getGuides(localStorage.getItem('locale') || 'en')
  const targetTopic = guides.find((topic: { references: string | string[]; }) =>
    topic.references.includes(id)
  );
  if (targetTopic) return targetTopic.id;
}
