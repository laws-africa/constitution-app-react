import {toc} from "./data/constitution";

export const handleSupportersLink = (url: string) => {
  window.open(url, '_blank');
};

/**
 * When the user clicks a link inside an AKN document, and the target isn't visible locally, then
 * find the containing provision and load it.
 */
export function handleInDocumentLinks(root: HTMLElement, doc: HTMLDocument, history: any, routePrefix: string) {
  root.addEventListener('click', e => {
    // special case: link to the constitution
    // @ts-ignore
    if (e.target.matches('a[data-href="/akn/za/act/1996/constitution"]')) {
      history.push('/constitution');
      e.stopImmediatePropagation();
      e.preventDefault();
    }

    // @ts-ignore
    if (e.target.matches('a[href^="#"]')) {
      // @ts-ignore
      const target = e.target.getAttribute('href');

      if (target && !root.querySelector(target)) {
        // find the provision that includes the target element
        const element = doc.getElementById(target.substring(1));
        const pair = toc.closestTocEntry(element);

        if (pair) {
          e.stopImmediatePropagation();
          e.preventDefault();
          history.push(routePrefix + pair[1].id);
        }
      }
    }
  });
}
