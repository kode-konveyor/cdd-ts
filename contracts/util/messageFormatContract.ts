import { Contract } from "../../src/contract/Contract.js";
import { messageFormat } from "../../src/util/messageFormat.js";
import { FormatStringTestData } from "../../testdata/FormatStringTestData.js";

export const messageFormatContractParties = [messageFormat];

export const messageFormatContract = new Contract<typeof messageFormat>()
  .ifCalledWith(
    FormatStringTestData.default,
    FormatStringTestData.parametersAsListOne,
    FormatStringTestData.parametersAsListTwo
  )
  .thenReturn(
    "with strings as parameters, it returns a substitued string, starting at index 1",
    FormatStringTestData.formatted
  )

  .ifCalledWith(
    FormatStringTestData.referencing,
    FormatStringTestData.parametersAsObject
  )
  .thenReturn(
    "with record as parameter, it returns a substitued string, using keys of the record",
    FormatStringTestData.formatted
  )

  .ifCalledWith(FormatStringTestData.default)
  .thenReturn(
    "with no format parameters it returns the format string",
    FormatStringTestData.default
  )

  .ifCalledWith(
    FormatStringTestData.multiple,
    FormatStringTestData.parametersAsObject
  )
  .thenReturn(
    "with no format parameters it returns the format string",
    FormatStringTestData.formattedMultiple
  );
