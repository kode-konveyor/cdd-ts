import { ContractEntity } from "../types/ContractEntity.js";
import { MethodType } from "../types/MethodType.js";

export class WithParameterConstraints <T extends MethodType> extends ContractEntity<T> {
    withParameterConstraints<THIS extends ContractEntity<T>>(
        explanation: string,
        checker: (...parameters: Parameters<T>) => void
    ): THIS {
        if (this.currentRun != null)
            this.currentRun.parameterConstraints.push([explanation, checker]);
        else
            this.parameterConstraints.push([explanation, checker]);
        return this as unknown as THIS;
    }
}