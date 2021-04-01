import * as Rules from '../assets/data/rules.json';
import { flattenTOC } from "../utils";

export const rulesData: any = (Rules as any).default;
// wrap the entire content in a div so the body has a single child
export const rulesRoot = new DOMParser().parseFromString(
    "<div>" + rulesData.body + "</div>", 'text/html');
export const rulesBody = rulesRoot.body.firstElementChild;

export const tableOfContents = Rules.toc;

/**
 * Get an entry from the table of contents.
 * @param id
 */
export function getTOCEntry(id: string) {
    let match = null;

    function search(items: any[]) {
        // breadth first search
        for (const item of items) {
            if (item.id === id) {
                match = item;
                return;
            }
        }

        for (const item of items) {
            if (item.children && item.children.length) {
                search(item.children);
            }
        }
    }

    search(tableOfContents);
    return match;
}

export const flatRulesTOC = flattenTOC(tableOfContents)