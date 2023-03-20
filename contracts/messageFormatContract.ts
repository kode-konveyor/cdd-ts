import { Contract } from "../src/contract/Contract.js";
import { messageFormat } from "../src/util/messageFormat.js";
import { getFormatParametersList, getFormatParametersStructured } from "../testdata/FormatParametersTestData.js";
import { getFormatString, getFormatStringMultiple, getFormatStringReferencing } from "../testdata/FormatStringTestData.js";
import { getFormattedStringMultiple, getFormattedString } from "../testdata/FormattedStringTestData.js";


export const messageFormatContractParties = [messageFormat]

export const messageFormatContract = new Contract<typeof messageFormat>()
    .ifCalledWith(getFormatString,...getFormatParametersList())
    .thenReturn("with strings as parameters, it returns a substitued string, starting at index 1",getFormattedString)
    .ifCalledWith(getFormatStringReferencing,getFormatParametersStructured)
    .thenReturn("with record as parameter, it returns a substitued string, using keys of the record",getFormattedString)
    .ifCalledWith(getFormatString)
    .thenReturn("with no format parameters it returns the format string",getFormatString)
    .ifCalledWith(getFormatStringMultiple,getFormatParametersStructured)
    .thenReturn("with no format parameters it returns the format string",getFormattedStringMultiple)
