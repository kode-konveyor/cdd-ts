import { CaseDescriptorEntity } from "./CaseDescriptorEntity";
import { IfCalledWith } from "./IfCalledWith";
import { Meanwhile } from "./Meanwhile";
import { ContractEntity } from "./ContractEntity";
import { SuchThat } from "./SuchThat";
import { SutType } from "./SutType";
import { ThenReturn } from "./ThenReturn";
import { ThenThrow } from "./ThenThrow";
import { When } from "./When";
import { applyMixins } from "src/util/applyMixins";
import { Stub } from "./Stub";

interface _Contract<T extends SutType> extends
    When<T>,
    IfCalledWith<T>,
    ThenReturn<T>,
    ThenThrow<T>,
    SuchThat<T>,
    Meanwhile<T>,
    Stub<T>
    {}

class _Contract<T extends SutType> extends ContractEntity<T>  {
    
    init(
        explanation: string,
        ): this {
        this.explanation = explanation
        this.cases[""] = new CaseDescriptorEntity()
        return this
    }

}

export const Contract= applyMixins(_Contract,[When, IfCalledWith,ThenReturn,SuchThat, Meanwhile,Stub,ThenThrow])
export type Contract<T extends SutType>=_Contract<T>