import { DiffService } from "../../cdd-ts.js";
import { serialize } from "../serialize.js";
import { ConsoleLogCheckerEntity } from "./ConsoleLogCheckerEntity.js";

const diff = new DiffService().diff;
export class CheckService extends ConsoleLogCheckerEntity {
  check(): void {
    const writtenToStdout: string = serialize(this.record);
    if (writtenToStdout.match(this.expected) == null) {
      throw new Error(diff(this.expected, writtenToStdout));
    }
  }
}
