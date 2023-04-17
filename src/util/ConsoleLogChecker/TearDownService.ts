import { ConsoleLogCheckerEntity } from "./ConsoleLogCheckerEntity.js";

export class TearDownService extends ConsoleLogCheckerEntity {
  tearDown(): void {
    console.log = this.oldlog;
  }
}
