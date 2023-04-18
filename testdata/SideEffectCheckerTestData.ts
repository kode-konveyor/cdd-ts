import equal from "fast-deep-equal";
import type { SideEffectCheckerType } from "../src/types/SideEffectChecker.js";
import { serialize } from "../src/util/serialize.js";
import { MessageFormatService } from "../src/util/messageFormat.js";

export const GlobalObject = {
  value: [true] as Array<any>,
  multiplier: 1,
};

const SECHECKER_ERROR = "SeChecker:\nexpected:{1}\nactual  :{2}";
export class SeChecker implements SideEffectCheckerType {
  constructor(
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
  ) {}

  public expected: Array<any> = [["hello b"]];

  setUp = async (): Promise<void> => {
    if (GlobalObject.value[0] !== true) throw new Error("ouch");
    GlobalObject.value = [];
  };

  check = (): void => {
    if (!equal(GlobalObject.value, this.expected))
      throw new Error(
        this.messageFormat(
          SECHECKER_ERROR,
          serialize(this.expected),
          serialize(GlobalObject.value)
        )
      );
  };

  tearDown = (): void => {
    GlobalObject.value = [true];
  };
}

function getSideEffectChecker(): SideEffectCheckerType {
  return new SeChecker();
}

function getSideEffectCheckerFailing(): SideEffectCheckerType {
  const sideEffectChecker = getSideEffectChecker() as SeChecker;
  sideEffectChecker.expected = [
    ["these are not the droids you are looking for"],
  ];
  return sideEffectChecker;
}

export const SideEffectCheckerTestData = {
  default: () => getSideEffectChecker,
  failing: () => getSideEffectCheckerFailing,
};
