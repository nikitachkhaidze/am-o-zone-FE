import { Sort } from './ui/sort.enum';

export const isSort = (input: unknown): input is Sort => {
  return Object.values(Sort).includes(input as Sort);
};
