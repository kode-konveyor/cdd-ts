import { Contract } from "../src/contract/Contract.js";
import { messageFormat } from "../src/util/messageFormat.js";
import { getFormatParametersList } from "../testdata/FormatParameters/getFormatParametersList.js";
import { getFormatParametersStructured } from "../testdata/FormatParameters/getFormatParametersStructured.js";
import { getFormatString } from "../testdata/FormatString/getFormatString.js";
import { getFormatStringMultiple } from "../testdata/FormatString/getFormatStringMultiple.js";
import { getFormatStringReferencing } from "../testdata/FormatString/getFormatStringReferencing.js";
import { FormattedString } from "../testdata/FormattedString/FormattedString.js";
import { FormattedStringMultiple } from "../testdata/FormattedString/FormattedStringMultiple.js";


export const messageFormatContractParties = [messageFormat]

export const messageFormatContract = new Contract<typeof messageFormat>()
    .ifCalledWith(getFormatString,...getFormatParametersList())
    .thenReturn("with strings as parameters, it returns a substitued string, starting at index 1",FormattedString)
    .ifCalledWith(getFormatStringReferencing,getFormatParametersStructured)
    .thenReturn("with record as parameter, it returns a substitued string, using keys of the record",FormattedString)
    .ifCalledWith(getFormatString)
    .thenReturn("with no format parameters it returns the format string",getFormatString)
    .ifCalledWith(getFormatStringMultiple,getFormatParametersStructured)
    .thenReturn("with no format parameters it returns the format string",FormattedStringMultiple)



