import { RunDescriptorEntity } from "../src/contract/RunDescriptorEntity";
import { getSideEffectChecker } from "./SideEffectCheckerTestData";

export function getRunDescriptor(): RunDescriptorEntity<import("/home/mag/project/KodeKonveyor/cdd-ts/src/contract/SutType").SutType> {
    return  new RunDescriptorEntity();
    
}

export function getRunDescriptorParametersSet(): RunDescriptorEntity<import("/home/mag/project/KodeKonveyor/cdd-ts/src/contract/SutType").SutType> {
    const runDescriptorEntity = getRunDescriptor()
    runDescriptorEntity.parameters=[1,"a"]
    return runDescriptorEntity
}
export function getRunDescriptorwithParametersReturnAndSideeffectcheck():RunDescriptorEntity<(arg: number, arg2: string) => string> {
    const runDescriptorEntity = getRunDescriptorParametersSet()
    runDescriptorEntity.explanation= "run explanation";
    runDescriptorEntity.returnValue= "1";
    runDescriptorEntity.returnValueChecks= [];
    runDescriptorEntity.sideEffectChecks= [getSideEffectChecker()];
    return runDescriptorEntity;
}

export function getRunDescriptorWithDoubleReturn(): RunDescriptorEntity<(arg: number, arg2: string) => string> {
    const runDescriptor = getRunDescriptorwithParametersReturnAndSideeffectcheck()
    runDescriptor.explanation="triple return"
    runDescriptor.returnValue="3"
    runDescriptor.sideEffectChecks.pop()
    return runDescriptor
}