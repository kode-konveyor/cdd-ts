import equal from "fast-deep-equal";
import { messageFormat } from "../../src/util/messageFormat";
import { SideEffectCheckerType } from "../../src/types/SideEffectChecker";

export const GLobalObject = {
    value: [] as Array<any>,
    multiplier: 1
}

export class SeChecker implements SideEffectCheckerType {

    expected: Array<any>;

    constructor(expected: Array<any>) {
        this.expected = expected;
    }

    setUp = (): void => {
        GLobalObject.value = []
    };

    check(): void {
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
