import { AnnotateFunctionService } from "./AnnotateFunctionService.js";
import { DeepCopyService } from "./DeepCopyService.js";
import { type DescriptorAddType } from "../types/DescriptorAddType.js";
import { type Descriptorfields } from "../types/Descriptorfields.js";
import { NO_SUCH_TESTDATA, NO_SUCH_RECORD } from "./Messages.js";
import { type TestData } from "../types/TestData.js";
import { type TestDataDescriptor } from "../types/TestDataDescriptor.js";
import { MessageFormatService } from "./messageFormat.js";

export class MakeTestDataService<T, K extends TestDataDescriptor<T>> {
  constructor(
    private readonly annotateFunction = AnnotateFunctionService.prototype
      .annotateFunction,
    private readonly deepCopy = DeepCopyService.prototype.deepCopy,
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
  ) {}

  makeTestData(descriptor: K, constructor?: () => T): TestData<T, K> {
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
          throw new Error(
            this.messageFormat(NO_SUCH_TESTDATA, thisDescriptor.__from)
          );
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
            throw new Error(this.messageFormat(NO_SUCH_RECORD, foo));
          otherRecord[bar] = baz;
        } else if (field !== "__from")
          (data as Record<string, unknown>)[field] = (
            descriptor[key] as Record<string, unknown>
          )[field];
      }
      ret[key] = this.annotateFunction(() => this.deepCopy(data));
    }
    return ret as TestData<T, K>;
  }
}
