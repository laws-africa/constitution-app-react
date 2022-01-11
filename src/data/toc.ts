export class TableOfContents {
  public items: any[];
  public itemsById: Map<string, any>;
  public flattened: any[];

  constructor(items: any[]) {
    this.items = items;
    this.itemsById = new Map();
    this.indexItems(items, null);
    this.flattened = flattenTOC(items);
  }

  /** Mapping from toc element id to toc entry
   */
  indexItems(items: any[], parent: any | null) {
    for (const item of items) {
      // add parent so we can walk upwards
      item.parent = parent;
      item.sortKey = this.itemsById.size;
      this.itemsById.set(item.id, item);

      if (item.children) {
        this.indexItems(item.children, item);
      }
    }
  }

  /**
   * Find the closest ancestor of an element that has an entry in the table of contents.
   *
   * @return [element, entry]
   */
  closestTocEntry(element: HTMLElement | null) {
    while (element) {
      const id = element.getAttribute('id');
      if (id && this.itemsById.get(id)) {
        return [element, this.itemsById.get(id)];
      }
      element = element.parentElement;
    }
  }
}

function flattenTOC(arr: any[], depth: number = 0) {
  let result: string[] = [];

  arr.forEach(el => {
    if (el.id) {
      el.depth = depth;
      result.push(el);
    }
    if (el.children && el.children.length > 0) {
      result = result.concat(flattenTOC(el.children, depth + 1));
    }
  });

  return result;
}




