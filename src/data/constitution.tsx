import * as Constitution from '../assets/data/constitution.json';
import { TableOfContents } from './toc';

export const constitutionData: any = (Constitution as any).default;

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

/**
 * Get a particular language version of the constitution.
 * @param lang three letter language code (eg. 'eng', 'xho')
 */
export function getExpression(lang: string): Expression {
  // @ts-ignore
  return expressions.get(lang) || expressions.get('eng');
}
