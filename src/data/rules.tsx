import rules from '../assets/data/rules.json';
import { TableOfContents } from './toc';

// wrap the entire content in a div so the body has a single child
export const rulesRoot = new DOMParser().parseFromString(
  "<div>" + rules.body + "</div>", 'text/html');
export const rulesBody = rulesRoot.body.firstElementChild;

export const toc = new TableOfContents(rules.toc);
