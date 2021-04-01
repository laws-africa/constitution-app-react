export const handleSupportersLink = (url: string) => {
  window.open(url, '_blank');
};

export function flattenTOC (arr: any[]) {
    let result: string[] = [];

    arr.forEach(el => {
        if (el.id) result.push(el.id);
        if (el.children && el.children.length > 0) {
            result = result.concat(flattenTOC(el.children));
        };
    });

    return result;
}