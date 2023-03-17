import { caseName } from "./CaseName";
import { messageFormat } from "../util/messageFormat";
import { ContractEntity } from "../types/ContractEntity";
import { SideEffectCheckerType } from "../types/SideEffectChecker";
import { MethodType } from "../types/MethodType";
import { SIDE_EFFECT_CHECK_FAILURE_MESSAGE } from "./Messages";

export function oneSideEffectCheck<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS) {
    return (entry: [string, SideEffectCheckerType]) => {
        try {
            entry[1].check();
        } catch (error) {
            throw new Error(messageFormat(
                SIDE_EFFECT_CHECK_FAILURE_MESSAGE,
                caseName.call(this),
                entry[0],
                String(error)));
        }
        entry[1].tearDown();
    };
};
