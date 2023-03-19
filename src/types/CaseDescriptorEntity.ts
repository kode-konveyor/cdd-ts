import { RunDescriptorEntity } from "./RunDescriptorEntity.js";
import { MethodType } from "./MethodType.js";

export class CaseDescriptorEntity<T extends MethodType> {
    runs: Array<RunDescriptorEntity<T>> = [];
    setUp?: () => void;
    tearDown?: () => void;
}
