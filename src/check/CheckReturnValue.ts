import { RunDescriptorEntity } from "../types/RunDescriptorEntity.js";
import { messageFormat } from "../util/messageFormat.js";
import { MethodType } from "../types/MethodType.js";
import { RETURN_VALUE_MISMATCH_MESSAGE_FORMAT } from "./Messages.js";
import { CaseName } from "./CaseName.js";

import { serialize } from "../util/serialize.js";
import { diff } from "../util/diff.js";

export class CheckReturnValue<T extends MethodType> {
    constructor(
        readonly caseName = CaseName.prototype.caseName,
    ) {
    }

    async checkReturnValue(
        currentRun: RunDescriptorEntity<T>,
        result: ReturnType<T>
    ): Promise<void> {
            if(currentRun.returnValueChecks.length !== 0)
                return
            const actual = serialize(result);
            const returnValueGetter = currentRun.returnValueGetter;
            if (returnValueGetter == null)
                throw new Error(messageFormat(
                    RETURN_VALUE_MISMATCH_MESSAGE_FORMAT,
                    this.caseName(),
                    "undefined",
                    actual,
                    ""
                ))
            const expected = serialize(returnValueGetter());
            if (actual !== expected) {
                throw new Error(messageFormat(
                    RETURN_VALUE_MISMATCH_MESSAGE_FORMAT,
                    this.caseName(),
                    expected,
                    actual,
                    diff(expected, actual)
                ));
            }
    }
}

