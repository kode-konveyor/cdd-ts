import { RunDescriptorEntity } from "./RunDescriptorEntity";
import { ContractEntity } from "./ContractEntity";
import { SutType } from "./SutType";

export class IfCalledWith<T extends SutType> extends ContractEntity<T> {

    ifCalledWith(...parameters: Parameters<T>):this {
        if(this.currentRun) {
            const currentCase = (this.currentCase)? this.currentCase : "";
            this.cases[currentCase].runs.push(this.currentRun)
        }
        this.currentRun = new RunDescriptorEntity()
        this.currentRun.parameters = parameters;
        return this;
    }

}
