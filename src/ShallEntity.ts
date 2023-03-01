import { SideEffectChecker } from "./SideEffectChecker";
import { SutType } from "./SutType";

export class ShallEntity<T extends SutType> {
    testedFunction!: T;
    parameters!: Parameters<T>;
    returnValue!: ReturnType<T>;
    returnValueChecks!: [string, (returnValue: ReturnType<T>, ...parameters: Parameters<T>) => boolean][];
    sideEffectChecks!: [string, SideEffectChecker<T>][]

}
