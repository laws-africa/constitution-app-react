// File for defining reusable types and interfaces

type tFuncOptions = {
  [key: string]: any,
  defaultValue?: string,
  ns?: string,
}

export interface iTFunc {
  t(key:string, config: string |  tFuncOptions): any,
}
