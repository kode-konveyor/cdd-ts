import { Contract } from "../../src/contract/Contract.js";
import type { CDDConfiguration } from "../../src/types/CDDConfiguration";
import type { TestDataDescriptor } from "src/types/TestDataDescriptor.js";
import { MakeTestDataTestData } from "../../testdata/MakeTestDataTestData.js";
import { MadeTestDataTestData } from "../../testdata/MadeTestDataTestData.js";
import { ReturnValueCheckTestData } from "../../testdata/ReturnValueCheckTestData.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";
import { bound } from "../../src/cdd-ts.js";

export const makeTestDataContractParties = [bound(MakeTestDataService)];

export const makeTestDataContract = new Contract<
  MakeTestDataService<
    CDDConfiguration,
    TestDataDescriptor<CDDConfiguration>
  >["makeTestData"]
>()
  .setTitle("makes test data from configuration descriptor")

  .ifCalledWith(MakeTestDataTestData.default)
  .thenReturn(
    "empy descriptor yields empty testData",
    MadeTestDataTestData.default
  )

  .ifCalledWith(MakeTestDataTestData.withFrom, MakeTestDataTestData.constructor)
  .thenReturn(
    "if __from is '' then a new item with the constructor is created",
    MadeTestDataTestData.withFrom
  )

  .ifCalledWith(MakeTestDataTestData.withFrom)
  .thenReturn(
    "if no constructor is defined, a '{}' is used",
    MadeTestDataTestData.withFromNoConstructor
  )

  .ifCalledWith(
    MakeTestDataTestData.withField,
    MakeTestDataTestData.constructor
  )
  .thenReturn(
    "the fields are set from the descriptor",
    MadeTestDataTestData.withField
  )

  .ifCalledWith(
    MakeTestDataTestData.withNamedGetter,
    MakeTestDataTestData.constructor
  )
  .thenReturn("if __from is not empty, the named getter is used for the data", {
    default: MadeTestDataTestData.withnamedGetter,
    check: ReturnValueCheckTestData.makeTestDataLeakTest,
  })

  .ifCalledWith(
    MakeTestDataTestData.withNonexistingReference,
    MakeTestDataTestData.constructor
  )

  .thenThrow(
    "if __from references an item which is later or does not exist, that is an error",
    "did you reference a later item in __from?"
  )

  .ifCalledWith(MakeTestDataTestData.badAdd, MakeTestDataTestData.constructor)
  .thenThrow(
    "if __add references an item which does not exist, that is an error",
    "no record named baz"
  )
  .ifCalledWith(
    MakeTestDataTestData.withTransform,
    MakeTestDataTestData.constructor
  )
  .thenReturn(
    "__transform is a transformation fnction for immer",
    MadeTestDataTestData.withnamedGetter
  );
