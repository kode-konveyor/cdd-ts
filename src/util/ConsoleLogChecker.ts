import { type SideEffectCheckerType } from "../types/SideEffectChecker.js";
import { serialize } from "./serialize.js";

export class ConsoleLogChecker implements SideEffectCheckerType {
  oldlog!: typeof console.log;
  record: Array<Array<string>> = [];

  constructor(readonly expected: string) {}

  setUp(): void {
    this.oldlog = console.log;
    console.log = (...params) => {
      this.record.push(params);
    };
  }

  tearDown(): void {
    console.log = this.oldlog;
  }

  check(): void {
    const writtenToStdout: string = serialize(this.record);
    if (writtenToStdout.match(this.expected) == null) {
      throw new Error(writtenToStdout);
    }
  }
}
