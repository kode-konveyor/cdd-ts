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
