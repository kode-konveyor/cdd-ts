import { RunDescriptorEntity } from "../types/RunDescriptorEntity";
import { ContractEntity } from "../types/ContractEntity";
import { MethodType } from "../types/MethodType";
import { caseName } from "../check/CaseName";
import { messageFormat } from "../util/messageFormat";
import { ParameterGetters } from "src/types/ParameterGettersType";

export function ifCalledWith<T extends MethodType, THIS extends ContractEntity<T>>(this: THIS, ...parameterGetters: ParameterGetters<T>): THIS {
    if (this.currentRun !== undefined) {
        if (this.currentRun.returnValueGetter == null && this.currentRun.thrown == null)
            throw new Error(messageFormat(
                "{1}: current run is incomplete: neither thenReturn nor thenThrow was called",
                caseName.call(this)))
        const currentCase = (this.currentCase != null) ? this.currentCase : "";
        this.cases[currentCase].runs.push(this.currentRun)
    }
    this.currentRun = new RunDescriptorEntity()
    this.currentRun.parameterGetters = parameterGetters;
    return this;
}
