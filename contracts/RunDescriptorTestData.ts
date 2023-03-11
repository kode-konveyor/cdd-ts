import { RunDescriptorEntity } from "src/contract/RunDescriptorEntity";
import { getSideEffectChecker } from "./SideEffectCheckerTestData";

export function getRunDescriptor():RunDescriptorEntity<(arg: number, arg2: string) => string> {
    const runDescriptorEntity:RunDescriptorEntity<(arg: number, arg2: string) => string> = structuredClone({
    explanation: "run explanation",
    parameters: [1, "a"],
    returnValue: "1",
    returnValueChecks: [],
    sideEffectChecks: [],
    thrown:undefined
    })
    runDescriptorEntity.sideEffectChecks.push( 
        getSideEffectChecker()
    )
    return runDescriptorEntity;
}

export function getRunDescriptorWithDoubleReturn(): RunDescriptorEntity<(arg: number, arg2: string) => string> {
    const runDescriptor = getRunDescriptor()
    runDescriptor.explanation="triple return"
    runDescriptor.returnValue="3"
    runDescriptor.sideEffectChecks.pop()
    return runDescriptor
}