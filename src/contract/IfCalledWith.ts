import { RunDescriptorEntity } from "./RunDescriptorEntity";
import { ContractEntity } from "./ContractEntity";
import { SutType } from "./SutType";
import { caseName } from "../check/CaseName";
import { messageFormat } from "../util/messageFormat";

export function ifCalledWith<T extends SutType,THIS extends ContractEntity<T>>(this: THIS,...parameters: Parameters<T>):THIS {
        if(this.currentRun !== undefined) {
            if(this.currentRun.returnValue == null && this.currentRun.thrown == null)
                throw new Error(messageFormat(
                    "{1}: current run is incomplete: neither thenReturn nor thenThrow was called",
                    caseName.call(this)))
            const currentCase = (this.currentCase != null)? this.currentCase : "";
            this.cases[currentCase].runs.push(this.currentRun)
        }
        this.currentRun = new RunDescriptorEntity()
        this.currentRun.parameters = parameters;
        return this;
    }
