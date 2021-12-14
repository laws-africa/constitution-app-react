/*---- File for common types and interfaces ---*/

export interface TOCItem {
  [key: string]: any; // type for unknown keys.
  children?: TOCItem[];
}

export type CallbackType = (...arg: string[]) => void;


export type RowPropsType = {
  index: number,
  setSize: CallbackType,
  windowWidth: number,
  data: TOCItem[]
}
