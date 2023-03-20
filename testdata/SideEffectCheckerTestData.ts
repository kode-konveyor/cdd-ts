import equal from "fast-deep-equal";
import { SideEffectCheckerType } from "../src/types/SideEffectChecker.js";
import { messageFormat } from "../src/util/messageFormat.js";

export const GLobalObject = {
    value: [] as Array<any>,
    multiplier: 1
}


export class SeChecker implements SideEffectCheckerType {

    public expected: Array<any> = [["hello b"]]

    setUp = (): void => {
        GLobalObject.value = []
    };

    check = (): void => {
        if (!(equal(GLobalObject.value, this.expected)))
            throw new Error(messageFormat(
                "SeChecker:\nexpected:{1}\nactual  :{2}",
                this.expected.toString(),
                GLobalObject.value.toString()
            ))
    }

    tearDown = (): void => {
    };

}

export function getSideEffectChecker(): SideEffectCheckerType {
    return new SeChecker();
}

export function getSideEffectCheckerFailing(): SideEffectCheckerType {
    const sideEffectChecker = getSideEffectChecker() as SeChecker
    sideEffectChecker.expected = [["these are not the droids you are looking for"]];
    return sideEffectChecker
}
