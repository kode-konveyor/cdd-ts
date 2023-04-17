import { ConsoleLogCheckerEntity } from "./ConsoleLogCheckerEntity.js";

export class SetUpService extends ConsoleLogCheckerEntity {
  setUp(): void {
    this.oldlog = console.log;
    console.log = (...params) => {
      this.record.push(params);
    };
  }
}
