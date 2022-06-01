import data from "../assets/data/data.json";

export interface Guide {
  id: string;
  title: string;
  snippet: string;
  topic_meaning: string;
  interpretation: string;
  mechanism: string | null;
  legislation: string | null;
  references: string[];
  cases: string[];
}

export const guides = (data.topics as Guide[]);
