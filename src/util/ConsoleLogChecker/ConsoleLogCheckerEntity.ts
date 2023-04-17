export class ConsoleLogCheckerEntity {
  oldlog!: typeof console.log;
  record: Array<Array<string>> = [];
  expected!: string;
}
