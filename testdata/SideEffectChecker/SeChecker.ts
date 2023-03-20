import equal from "fast-deep-equal";
import { messageFormat } from "../../src/util/messageFormat.js";
import { SideEffectCheckerType } from "../../src/types/SideEffectChecker.js";

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
        if (!equal(GLobalObject.value, this.expected))
            throw new Error(messageFormat(
                "SeChecker:\nexpected:{1}\nactual  :{2}",
                this.expected.toString(),
                GLobalObject.value.toString()
            ))
    }

    tearDown = (): void => {
    };

}
