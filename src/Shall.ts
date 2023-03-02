import { mockFn } from "jest-mock-extended";
import { applyMixins } from "./applyMixins";
import { Check } from "./Check";
import { IfCalledWith } from "./IfCalledWith";
import { Meanwhile } from "./Meanwhile";
import { ShallEntity } from "./ShallEntity";
import { SuchThat } from "./SuchThat";
import { SutType } from "./SutType";
import { ThenReturn } from "./ThenReturn";

interface _Shall<T extends SutType> extends IfCalledWith<T>, ThenReturn<T>, SuchThat<T>, Meanwhile<T>, Check<T> {

}

class _Shall<T extends SutType> extends ShallEntity<T>  {
    stub(): T {
        const stub= mockFn<T>()
        stub.calledWith(...this.parameters).mockReturnValue(this.returnValue)
        return stub
    }
    thenThrow( expectedRegex: string ) {
        this.thrown=expectedRegex
        return this
    }
    
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

export const Shall= applyMixins(_Shall,[IfCalledWith,ThenReturn,SuchThat, Meanwhile, Check])
