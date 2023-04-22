import { bound } from "../../src/cdd-ts.js";
import { Contract } from "../../src/contract/Contract.js";
import { MessageFormatService } from "../../src/util/messageFormat.js";
import { FormatStringTestData } from "../../testdata/FormatStringTestData.js";

export const messageFormatContractParties = [bound(MessageFormatService)];

export const messageFormatContract = new Contract<
  MessageFormatService["messageFormat"]
>()
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

  .ifCalledWith(
    FormatStringTestData.multiple,
    FormatStringTestData.parametersAsObject
  )
  .thenReturn(
    "with no format parameters it returns the format string",
    FormatStringTestData.formattedMultiple
  )
  .ifCalledWith(
    FormatStringTestData.currentRunIsInComplete,
    FormatStringTestData.defaultCasereference
  )
  .thenReturn(
    "case for IfCalledWith current run incomplete",
    FormatStringTestData.currentRunIsIncompleteMessage
  )
  .ifCalledWith(FormatStringTestData.didNotPassChecker)
  .thenReturn(
    "case for ifcalledWith did not pass the check",
    FormatStringTestData.didNotPassMessage
  );
