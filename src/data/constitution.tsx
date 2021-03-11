import * as Constitution from '../assets/data/constitution.json';

export const constitutionData: any = (Constitution as any).default;
// wrap the entire content in a div so the body has a single child
export const constitutionRoot = new DOMParser().parseFromString(
    "<div>" + constitutionData.body + "</div>", 'text/html');
export const constitutionBody = constitutionRoot.body.firstElementChild;

export const tableOfContents = Constitution.toc;

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

function flattenTOC (arr: any[]) {
    let result: any[] = [];

    arr.forEach(el => {
        if (el.id) result.push(el.id);
        if (el.children && el.children.length > 0) {
            result = result.concat(flattenTOC(el.children));
        };
    });

    return result;
}

export const flatTOC = flattenTOC(tableOfContents);
