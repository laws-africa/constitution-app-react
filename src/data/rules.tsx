import * as Rules from '../assets/data/rules.json';
import { TableOfContents } from './toc';

export const rulesData: any = (Rules as any).default;
// wrap the entire content in a div so the body has a single child
export const rulesRoot = new DOMParser().parseFromString(
  "<div>" + rulesData.body + "</div>", 'text/html');
export const rulesBody = rulesRoot.body.firstElementChild;

export const toc = new TableOfContents(Rules.toc);
