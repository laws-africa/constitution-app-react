let _path = '';


export function setRedirect(path: any) {
  _path = path;
}

/**
 * Clear and return the redirect path
 */
export function getAndClearRedirected() {
  const path = _path;
  _path = '';
  return path;
}
