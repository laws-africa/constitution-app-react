import * as Constitution from '../assets/data/constitution.json';
import { TableOfContents } from './toc';

export const constitutionData: any = (Constitution as any).default;
// wrap the entire content in a div so the body has a single child
export const constitutionRoot = new DOMParser().parseFromString(
  "<div>" + constitutionData.body + "</div>", 'text/html');
export const constitutionBody = constitutionRoot.body.firstElementChild;

export const toc = new TableOfContents(Constitution.toc);
