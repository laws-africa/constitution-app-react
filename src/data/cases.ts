import data from "../assets/data/data.json";

export interface Case {
  id: string;
  title: string;
  snippet: string | null;
  href: string;
  facts_and_issues: string;
  right_and_principle: string;
  interpretation: string;
  topics: string[];
}

export const getCases = (lang: string) => {
  // @ts-ignore
  return data[lang].cases
};
