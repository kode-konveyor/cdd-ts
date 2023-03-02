import { applyMixins } from "./applyMixins";
import { Check } from "./Check";
import { IfCalledWith } from "./IfCalledWith";
import { Meanwhile } from "./Meanwhile";
import { ShallEntity } from "./ShallEntity";
import { Stub } from "./Stub";
import { SuchThat } from "./SuchThat";
import { SutType } from "./SutType";
import { ThenReturn } from "./ThenReturn";
import { ThenThrow } from "./ThenThrow";

interface _BeThat<T extends SutType> extends IfCalledWith<T>, ThenReturn<T>, SuchThat<T>, Meanwhile<T>, Check<T>, Stub<T>, ThenThrow<T> {

}

class _BeThat<T extends SutType> extends ShallEntity<T>  {
    
    constructor(
        explanation: string,
        testedFunction: T,
        ) {
        super();
        this.explanation = explanation
        this.testedFunction = testedFunction
        this.returnValueChecks = []
        this.sideEffectChecks = []
    }

}

export const BeThat= applyMixins(_BeThat,[IfCalledWith,ThenReturn,SuchThat, Meanwhile, Check,Stub,ThenThrow])
