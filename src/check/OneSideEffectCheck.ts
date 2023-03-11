import { CaseName } from "./CaseName";
import { injectable } from "tsyringe";
import { messageFormat } from "../util/messageFormat";
import { ContractEntity } from "../contract/ContractEntity";
import { SideEffectChecker } from "../contract/SideEffectChecker";
import { SutType } from "../contract/SutType";
import { SIDE_EFFECT_CHECK_FAILURE_MESSAGE } from "./Messages";

@injectable()
export class OneSideEffectCheck<T extends SutType> {

    constructor(
        readonly caseName: CaseName<T>
    ) { }

    oneSideEffectCheck = (contract: ContractEntity<T>) => {
        return (entry: [string, SideEffectChecker<T>]) => {
            try {
                entry[1].check();
            } catch (error) {
                throw new Error(messageFormat(
                    SIDE_EFFECT_CHECK_FAILURE_MESSAGE,
                    this.caseName.caseName(contract),
                    entry[0],
                    String(error)));
            }
            entry[1].tearDown();
        };
    };
}
