import { RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { caseName } from "./CaseName.js";
import { messageFormat } from "../util/messageFormat.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";
import { RETURN_VALUE_MISMATCH_MESSAGE_FORMAT } from "./Messages.js";
import { diffLines } from "diff";
import colors from "colors"

const { enable } = colors

function rewriter(key: string, value: any): any {
    if (typeof value === "function") {
        const consolidatedValue = value.toString().replace(/[ \t]+/g, "");
        return consolidatedValue
    }
    return value
}

function serialize(object: any): string {
    return JSON.stringify(object, rewriter, 1)
}

enable()
function diff(expected: string, actual: string): string {

    return diffLines(expected, actual).map(diff => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const color = diff.added ? "bold" :
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            diff.removed ? "strikethrough" : "grey";
        if (color === "grey")
            return diff.value
        return (diff.value[color] as string).bgYellow
    }
    )
        .join("\n")
}


export function checkReturnValue<T extends MethodType, C extends ContractEntity<T>>(
    this: C,
    currentRun: RunDescriptorEntity<T>,
    result: ReturnType<T>
): void {
    const actual = serialize(result);
    const returnValueGetter = currentRun.returnValueGetter;
    if (returnValueGetter == null)
        throw new Error(messageFormat(
            RETURN_VALUE_MISMATCH_MESSAGE_FORMAT,
            caseName.call(this),
            "undefined",
            actual,
            ""
        ))
    const expected = serialize(returnValueGetter());
    if (actual !== expected)
        throw new Error(messageFormat(
            RETURN_VALUE_MISMATCH_MESSAGE_FORMAT,
            caseName.call(this),
            expected,
            actual,
            diff(expected, actual)
        ));
}
