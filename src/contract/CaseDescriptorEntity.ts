import { RunDescriptorEntity } from "./RunDescriptorEntity";
import { SutType } from "./SutType";

export class CaseDescriptorEntity<T extends SutType> {
    runs: RunDescriptorEntity<T>[] = [];
    setUp?: () => void;
    tearDown?: () => void;
}
