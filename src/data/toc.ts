export class TableOfContents {
  public items: any[];
  public itemsById: Map<string, any>;
  public flattened: string[];
  public flattenedDeep: any[];

  constructor(items: any[]) {
    this.items = items;
    this.itemsById = new Map();
    this.indexItems(items, null);
    this.flattened = flattenTOC(items);
    //TODO: find suitable name
    this.flattenedDeep = flattenTOCDeep(items);
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

function flattenTOC(arr: any[]) {
  let result: string[] = [];

  arr.forEach(el => {
    if (el.id) result.push(el.id);
    if (el.children && el.children.length > 0) {
      result = result.concat(flattenTOC(el.children));
    };
  });

  return result;
}

// @ts-ignore
function flattenTOCDeep(array: any[]) {
  let flatten: { depth: number; children: any[]; }[] = [];
  const recurseFn = (item: { depth: number; children: any[]; }, depth = 0) => {
   item.depth = depth;
   flatten.push(item);
   if(item.children && item.children.length) {
     item.children.forEach((item: any) => recurseFn(item, depth + 1))
   }
  }
  array.forEach((item: { depth: number; children: any[]; }) => recurseFn(item))
  return flatten;

}




