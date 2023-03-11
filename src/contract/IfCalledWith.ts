import { RunDescriptorEntity } from "./RunDescriptorEntity";
import { ContractEntity } from "./ContractEntity";
import { SutType } from "./SutType";

export function ifCalledWith<T extends SutType,THIS extends ContractEntity<T>>(this: THIS,...parameters: Parameters<T>):THIS {
        if(this.currentRun) {
            const currentCase = (this.currentCase)? this.currentCase : "";
            this.cases[currentCase].runs.push(this.currentRun)
        }
        this.currentRun = new RunDescriptorEntity()
        this.currentRun.parameters = parameters;
        return this;
    }
