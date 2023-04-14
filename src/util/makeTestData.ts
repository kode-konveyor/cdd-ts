import { annotateFunction } from "./annotateFunction.js";
import { deepCopy } from "./deepCopy.js";
import { messageFormat } from "./messageFormat.js";

export type DescriptorAddType = [string, string, unknown];

interface Descriptorfields {
  __from: string;
  __add?: DescriptorAddType;
}

export type TestDataDescriptor<T> = Record<
  string,
  Partial<T> & Descriptorfields
>;

export type TestData<T, D extends TestDataDescriptor<T>> = Record<
  keyof D,
  () => T
>;

const NO_SUCH_TESTDATA =
  "No such testdata found: {1} did you reference a later item in __from?";
const NO_SUCH_RECORD = "no record named {1}";
export function makeTestData<T, K extends TestDataDescriptor<T>>(
  descriptor: K,
  constructor?: () => T
): TestData<T, K> {
  const ret: Record<string, () => T> = {};
  if (constructor === undefined) {
    constructor = (() => {
      return {};
    }) as unknown as () => T;
  }
  for (const key in descriptor) {
    let data: T;
    const thisDescriptor = descriptor[key] as Descriptorfields;
    if (thisDescriptor.__from === "") data = constructor();
    else {
      if (ret[thisDescriptor.__from] === undefined)
        throw new Error(messageFormat(NO_SUCH_TESTDATA, thisDescriptor.__from));
      data = (ret[thisDescriptor.__from] as () => T)();
    }
    for (const field in descriptor[key]) {
      if (field === "__add") {
        const [foo, bar, baz] = (
          descriptor[key] as Record<string, [string, string, unknown]>
        )[field] as DescriptorAddType;
        const otherRecord = (data as Record<string, Record<string, unknown>>)[
          foo
        ];
        if (otherRecord === undefined)
          throw new Error(messageFormat(NO_SUCH_RECORD, foo));
        otherRecord[bar] = baz;
      } else if (field !== "__from")
        (data as Record<string, unknown>)[field] = (
          descriptor[key] as Record<string, unknown>
        )[field];
    }
    ret[key] = annotateFunction(() => deepCopy(data));
  }
  return ret as TestData<T, K>;
}
