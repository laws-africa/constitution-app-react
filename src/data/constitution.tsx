import * as Constitution from '../assets/data/constitution.json';
import { TableOfContents } from './toc';

interface iConstitution {
  [key: string] : any,
  en: any
}

// constitutionData must at least have en as a key
export const constitutionData: iConstitution = (Constitution as any).default;

export class Expression {
  info: any;
  document: Document;
  body: Element;
  toc: TableOfContents;

  constructor (info: any) {
    this.info = info;
    this.document = new DOMParser().parseFromString("<div>" + info.body + "</div>", 'text/html');
    // @ts-ignore
    this.body = this.document.body.firstElementChild;
    this.toc = new TableOfContents(info.toc);
  }
}

const expressions = new Map<string, Expression>();
for (const lang of Object.keys(constitutionData)) {
  expressions.set(lang, new Expression(constitutionData[lang]));
}

// the current expression
let expression: Expression | null = null;

/**
 * Get a particular language version of the constitution.
 * @param lang two letter language code (eg. 'en', 'xh', 'zu')
 */
export function getExpression(lang: string): Expression {
  // if constitutionData has key use lang otherwise default to english
  lang = constitutionData[lang] ? lang : 'en';
  // is the requested expression different from the current one
  if (!expression || expression.info['language'] !== lang) {
    expression = new Expression(constitutionData[lang]);
  }
  return expression;
}
