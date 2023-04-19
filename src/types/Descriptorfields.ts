import { type DescriptorAddType } from "./DescriptorAddType.js";

export interface Descriptorfields<T> {
  __from?: string;
  __add?: DescriptorAddType;
  __transform?: (draft: T) => void;
}
