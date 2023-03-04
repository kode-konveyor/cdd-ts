import { applyMixins } from "./applyMixins";
import { CaseDescriptorEntity } from "./CaseDescriptorEntity";
import { Check } from "./Check";
import { IfCalledWith } from "./IfCalledWith";
import { Meanwhile } from "./Meanwhile";
import { RunDescriptorEntity } from "./RunDescriptorEntity";
import { ShallEntity } from "./ShallEntity";
import { Stub } from "./Stub";
import { SuchThat } from "./SuchThat";
import { SutType } from "./SutType";
import { ThenReturn } from "./ThenReturn";
import { ThenThrow } from "./ThenThrow";

interface _BeThat<T extends SutType> extends IfCalledWith<T>, ThenReturn<T>, SuchThat<T>, Meanwhile<T>, Check<T>, Stub<T>, ThenThrow<T> {

}

type EnvironmentManipulator = {
    setUp: () => void;
    tearDown: () => void;
};

class _BeThat<T extends SutType> extends ShallEntity<T>  {
    when(explanation: string, environmentManipulator: EnvironmentManipulator):this {
        if(this.currentRun) {
            const currentCase = (this.currentCase)? this.currentCase : "";
            this.cases[currentCase].runs.push(this.currentRun)
        }

        this.currentCase = explanation
        const caseDescriptor = new CaseDescriptorEntity();
        caseDescriptor.setUp = environmentManipulator.setUp
        caseDescriptor.tearDown = environmentManipulator.tearDown
        this.cases[explanation] = caseDescriptor
        this.currentRun = undefined
        return this
    }
    
    constructor(
        explanation: string,
        testedFunction: T,
        ) {
        super();
        this.explanation = explanation
        this.testedFunction = testedFunction
        this.cases[""] = new CaseDescriptorEntity()
    }

}

export const BeThat= applyMixins(_BeThat,[IfCalledWith,ThenReturn,SuchThat, Meanwhile, Check,Stub,ThenThrow])
