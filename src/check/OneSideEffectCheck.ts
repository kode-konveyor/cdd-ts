import { caseName } from "./CaseName";
import { messageFormat } from "../util/messageFormat";
import { ContractEntity } from "../contract/ContractEntity";
import { SideEffectChecker } from "../contract/SideEffectChecker";
import { MethodType } from "../contract/MethodType";
import { SIDE_EFFECT_CHECK_FAILURE_MESSAGE } from "./Messages";

export function oneSideEffectCheck<T extends MethodType, THIS extends ContractEntity<T>>(
    this: THIS) {
    return (entry: [string, SideEffectChecker]) => {
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
