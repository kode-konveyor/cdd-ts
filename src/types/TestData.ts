import { type TestDataDescriptor } from "./TestDataDescriptor.js";

export type TestData<T, D extends TestDataDescriptor<T>> = Record<
  keyof D,
  () => T
>;
