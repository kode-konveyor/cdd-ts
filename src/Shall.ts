import { applyMixins } from "./applyMixins";
import { IfCalledWith } from "./IfCalledWith";
import { ShallEntity } from "./ShallEntity";
import { SuchThat } from "./SuchThat";
import { SutType } from "./SutType";
import { ThenReturn } from "./ThenReturn";

interface _Shall<T extends SutType> extends IfCalledWith<T>, ThenReturn<T>, SuchThat<T> {

}

class _Shall<T extends SutType> extends ShallEntity<T>  {
    
    constructor(
        testedFunction: T,
        ) {
        super();
        this.testedFunction = testedFunction
        this.returnValueChecks = []
    }
}

export const Shall = applyMixins(_Shall,[IfCalledWith,ThenReturn,SuchThat])
