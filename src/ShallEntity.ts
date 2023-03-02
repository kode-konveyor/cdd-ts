import { SideEffectChecker } from "./SideEffectChecker";
import { SutType } from "./SutType";

export class ShallEntity<T extends SutType> {
    thrown?: string  ;
    explanation!: string;
    testedFunction!: T;
    parameters!: Parameters<T>;
    returnValue!: ReturnType<T>;
    returnValueChecks!: [string, (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => void][];
    sideEffectChecks!: [string, SideEffectChecker<T>][]

}
