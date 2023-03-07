import { applyMixins } from "./applyMixins";
import { Check } from "./Check";
import { IfCalledWith } from "./IfCalledWith";
import { Meanwhile } from "./Meanwhile";
import { RunDescriptorEntity } from "./RunDescriptorEntity";
import { Stub } from "./Stub";
import { SuchThat } from "./SuchThat";
import { SutType } from "./SutType";
import { ThenReturn } from "./ThenReturn";
import { ThenThrow } from "./ThenThrow";
import { When } from "./When";
import { SetTitle } from "./SetTitle";
import { ContractEntity } from "./ContractEntity";

interface _Contract<T extends SutType> extends
    SetTitle<T>,
    When<T>,
    IfCalledWith<T>,
    ThenReturn<T>,
    ThenThrow<T>,
    SuchThat<T>,
    Meanwhile<T>,
    Check<T>,
    Stub<T>
    {}

class _Contract<T extends SutType> extends ContractEntity<T> {

}

export const Contract= applyMixins(_Contract,[SetTitle, When, IfCalledWith,ThenReturn,SuchThat, Meanwhile, Check,Stub,ThenThrow])
export type Contract<T extends SutType>=_Contract<T>