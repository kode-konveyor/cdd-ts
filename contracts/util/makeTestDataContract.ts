import { Contract } from "../../src/contract/Contract.js";
import type { CDDConfiguration } from "../../src/types/CDDConfiguration";
import type { TestDataDescriptor } from "src/types/TestDataDescriptor.js";
import { MakeTestDataTestData } from "../../testdata/MakeTestDataTestData.js";
import { MadeTestDataTestData } from "../../testdata/MadeTestDataTestData.js";
import { ReturnValueCheckTestData } from "../../testdata/ReturnValueCheckTestData.js";
import { MakeTestDataService } from "../../src/util/MakeTestDataService.js";
import { bound } from "../../src/cdd-ts.js";

export const makeTestDataContractParties = [bound(MakeTestDataService)];

const DID_YOU_REFERENCE_A_LATER_ITEM =
  "did you reference a later item in __from?";
const NO_RECORD_FOUND = "no record named baz";
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
  .thenReturn(
    "if __from is not empty, the named getter is used for the data",
    MadeTestDataTestData.withnamedGetter
  )
  .suchThat(
    "the getter referenced in __from is not modified",
    ReturnValueCheckTestData.makeTestDataLeakTest
  )

  .ifCalledWith(
    MakeTestDataTestData.withNonexistingReference,
    MakeTestDataTestData.constructor
  )

  .thenThrow(
    "if __from references an item which is later or does not exist, that is an error",
    DID_YOU_REFERENCE_A_LATER_ITEM
  )

  .ifCalledWith(MakeTestDataTestData.badAdd, MakeTestDataTestData.constructor)
  .thenThrow(
    "if __add references an item which does not exist, that is an error",
    NO_RECORD_FOUND
  );
