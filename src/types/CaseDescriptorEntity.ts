import { type RunDescriptorEntity } from "./RunDescriptorEntity.js";
import { type MethodType } from "./MethodType.js";

export class CaseDescriptorEntity<T extends MethodType> {
  runs: Array<RunDescriptorEntity<T>> = [];
  setUp?: (() => void) | (() => Promise<void>);
  tearDown?: () => void;
}
