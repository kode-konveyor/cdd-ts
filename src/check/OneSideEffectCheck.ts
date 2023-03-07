import { CaseName } from "./CaseName";
import { injectable } from "tsyringe";
import { messageFormat } from "src/util/messageFormat";
import { ContractEntity } from "src/contract/ContractEntity";
import { SideEffectChecker } from "src/contract/SideEffectChecker";
import { SutType } from "src/contract/SutType";
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
