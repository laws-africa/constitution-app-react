import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const data: any = {
  body:"",
  toc: [],
};
export const constitutionState = atom({
  key: 'constitutionState',
  default: data
});