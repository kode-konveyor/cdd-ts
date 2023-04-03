import equal from "fast-deep-equal";
import { Mutex } from "../src/check/Mutex.js";
import { SideEffectCheckerType } from "../src/types/SideEffectChecker.js";
import { messageFormat } from "../src/util/messageFormat.js";
import { serialize } from "../src/util/serialize.js";

export const GLobalObject = {
    value: [] as Array<any>,
    multiplier: 1
}

const mutex = new Mutex()

export class SeChecker implements SideEffectCheckerType {

    public expected: Array<any> = [["hello b"]]
    private unlock!: () => void

    setUp = async (): Promise<void> => {
        this.unlock = await mutex.lock()
        GLobalObject.value = []
    };

    check = (): void => {
        if (!(equal(GLobalObject.value, this.expected)))
            throw new Error(messageFormat(
                "SeChecker:\nexpected:{1}\nactual  :{2}",
                serialize(this.expected),
                serialize(GLobalObject.value)
            ))
    }

    tearDown = (): void => {
        this.unlock()
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
