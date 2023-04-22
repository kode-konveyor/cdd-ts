import { DiffService } from "../../cdd-ts.js";
import { serialize } from "../serialize.js";
import { ConsoleLogCheckerEntity } from "./ConsoleLogCheckerEntity.js";

export class CheckService extends ConsoleLogCheckerEntity {
  check(): void {
    const writtenToStdout: string = serialize(this.record);
    if (writtenToStdout.match(this.expected) == null) {
      throw new Error(new DiffService().diff(this.expected, writtenToStdout));
    }
  }
}
