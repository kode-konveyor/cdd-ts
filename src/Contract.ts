import { applyMixins } from "./applyMixins";
import { CaseDescriptorEntity } from "./CaseDescriptorEntity";
import { Check } from "./Check";
import { IfCalledWith } from "./IfCalledWith";
import { Meanwhile } from "./Meanwhile";
import { RunDescriptorEntity } from "./RunDescriptorEntity";
import { ContractEntity } from "./ContractEntity";
import { Stub } from "./Stub";
import { SuchThat } from "./SuchThat";
import { SutType } from "./SutType";
import { ThenReturn } from "./ThenReturn";
import { ThenThrow } from "./ThenThrow";
import { When } from "./When";

interface _Contract<T extends SutType> extends
    When<T>,
    IfCalledWith<T>,
    ThenReturn<T>,
    ThenThrow<T>,
    SuchThat<T>,
    Meanwhile<T>,
    Check<T>,
    Stub<T>
    {}

export type EnvironmentManipulator = {
    setUp: () => void;
    tearDown: () => void;
};

class _Contract<T extends SutType> extends ContractEntity<T>  {
    
    constructor(
        explanation: string,
        ) {
        super();
        this.explanation = explanation
        this.cases[""] = new CaseDescriptorEntity()
    }

}

export const Contract= applyMixins(_Contract,[When, IfCalledWith,ThenReturn,SuchThat, Meanwhile, Check,Stub,ThenThrow])
