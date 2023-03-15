import equal from "fast-deep-equal";
import { messageFormat } from "../src/util/messageFormat";
import { SideEffectChecker } from "../src/contract/SideEffectChecker";

export const GLobalObject = {
    value: [] as any[],
    multiplier: 1
}

export class SeChecker implements SideEffectChecker {

    expected: any[];

    constructor(expected: any[]) {
        this.expected = expected;
    }

    setUp = (): void => {
        GLobalObject.value = []
    };

    check(): void {
        if(!equal(GLobalObject.value,this.expected))
            throw new Error(messageFormat(
                "SeChecker:\nexpected:{1}\nactual  :{2}",
                this.expected.toString(),
                GLobalObject.value.toString()
            ))
    }

    tearDown = ():void => {
    };

}
