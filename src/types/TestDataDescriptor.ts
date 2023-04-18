import { type Descriptorfields } from "./Descriptorfields.js";

export type TestDataDescriptor<T> = Record<
  string,
  Partial<T> & Descriptorfields
>;
