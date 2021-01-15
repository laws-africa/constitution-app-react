import { constitutionRoot } from "./constitution";
import { rulesRoot } from "./rules";

function getSearchableProvisions(html: Document) {
  let searchData: { titleLower: string; title: string | null; content: string; id: string; }[] = [];
  // everything that can contain searchable text
  const selector = '.akn-p, .akn-listIntroduction, .akn-intro, .akn-wrapUp';

  html.querySelectorAll('.akn-section').forEach((section) => {
    // gather text content
    const text: (string | null)[] = [];
    section.querySelectorAll(selector).forEach(elem => {
      text.push(elem.textContent);
    });
    let titleSelector = section.querySelector('h3');
    let title = titleSelector ? titleSelector.textContent : "";

    searchData.push({
      titleLower: title ? title.toLocaleLowerCase() : "",
      title: title,
      content: text.join(' ').toLocaleLowerCase(),
      id: section.id
    });

  });

  return searchData;
};

export const searchableProvisions = getSearchableProvisions(constitutionRoot);
export const searchableRuleProvisions = getSearchableProvisions(rulesRoot);
