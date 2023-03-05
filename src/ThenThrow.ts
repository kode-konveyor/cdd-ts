import { ContractEntity } from "./ContractEntity";
import { SutType } from "./SutType";

export class ThenThrow<T extends SutType> extends ContractEntity<T> {
    thenThrow(explanation: string, expectedRegex: string|RegExp):this {
        if(!this.currentRun)
            throw new Error("thenThrow can only be used after an ifCalledWith")
        this.currentRun.explanation = explanation;
        this.currentRun.thrown = expectedRegex;
        return this;
    }
}
