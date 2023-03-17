import { RunDescriptorEntity } from "./RunDescriptorEntity";
import { MethodType } from "./MethodType";

export class CaseDescriptorEntity<T extends MethodType> {
    runs: Array<RunDescriptorEntity<T>> = [];
    setUp?: () => void;
    tearDown?: () => void;
}
