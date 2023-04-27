import { type TestedFunctionType } from "../../../testdata/MethodTestData.js";
import { type SideEffectCheckerType } from "../../types/SideEffectChecker.js";
import { CheckService } from "./CheckService.js";
import { ConsoleLogCheckerEntity } from "./ConsoleLogCheckerEntity.js";
import { SetUpService } from "./SetUpService.js";
import { TearDownService } from "./TearDownService.js";

export class ConsoleLogChecker
  extends ConsoleLogCheckerEntity
  implements SideEffectCheckerType<TestedFunctionType>
{
  constructor(
    expected: string,
    readonly setUp = SetUpService.prototype.setUp,
    readonly tearDown = TearDownService.prototype.tearDown,
    readonly check = CheckService.prototype.check
  ) {
    super();
    this.expected = expected;
  }
}
