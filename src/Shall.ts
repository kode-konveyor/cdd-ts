import { applyMixins } from "./applyMixins";
import { IfCalledWith } from "./IfCalledWith";
import { Meanwhile } from "./Meanwhile";
import { ShallEntity } from "./ShallEntity";
import { SuchThat } from "./SuchThat";
import { SutType } from "./SutType";
import { ThenReturn } from "./ThenReturn";

interface _Shall<T extends SutType> extends IfCalledWith<T>, ThenReturn<T>, SuchThat<T>,Meanwhile<T> {

}

class _Shall<T extends SutType> extends ShallEntity<T>  {
    
    constructor(
        testedFunction: T,
        ) {
        super();
        this.testedFunction = testedFunction
        this.returnValueChecks = []
        this.sideEffectChecks = []
    }

    check() {
        const result = this.testedFunction(...this.parameters)
        expect(result).toEqual(this.returnValue)
    }
}

export const Shall= applyMixins(_Shall,[IfCalledWith,ThenReturn,SuchThat, Meanwhile])
