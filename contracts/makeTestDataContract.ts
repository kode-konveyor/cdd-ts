import { Contract } from "../src/contract/Contract.js";
import { CDDConfiguration } from "../src/types/CDDConfiguration";
import { makeTestData, TestDataDescriptor } from "../src/util/makeTestData.js";
import { MakeTestDataTestData } from "../testdata/MakeTestDataTestData.js";
import { MadeTestDataTestData } from "../testdata/MadeTestDataTestData.js";

export const makeTestDataContractParties = [makeTestData]

export const makeTestDataContract = new Contract<typeof makeTestData<CDDConfiguration, TestDataDescriptor<CDDConfiguration>>>()
    .setTitle("makes test data from configuration descriptor")

    .ifCalledWith(MakeTestDataTestData.default)
    .thenReturn("empy descriptor yields empty testData", MadeTestDataTestData.default)

    .ifCalledWith(MakeTestDataTestData.withFrom, MakeTestDataTestData.constructor)
    .thenReturn("if __from is '' then a new item with the constructor is created", MadeTestDataTestData.withFrom)

    .ifCalledWith(MakeTestDataTestData.withFrom)
    .thenReturn("if no constructor is defined, a '{}' is used",MadeTestDataTestData.withFromNoConstructor)

    .ifCalledWith(MakeTestDataTestData.withField, MakeTestDataTestData.constructor)
    .thenReturn("the fields are set from the descriptor", MadeTestDataTestData.withField)

    .ifCalledWith(MakeTestDataTestData.withNamedGetter, MakeTestDataTestData.constructor)
    .thenReturn("if __from is not empty, the named getter is used for the data", MadeTestDataTestData.withnamedGetter)
    .suchThat("the getter referenced in __from is not modified", value => {
        // @ts-expect-error
        if (value['getOne']().moduleResolution !== "") {
            throw new Error("leak detected")
        }
    })

    .ifCalledWith(MakeTestDataTestData.withNonexistingReference, MakeTestDataTestData.constructor)

    .thenThrow("if __from references an item which is later or does not exist, that is an error",
        "did you reference a later item in __from?")

