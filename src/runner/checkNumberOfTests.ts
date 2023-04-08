import { CDDConfiguration } from "../types/CDDConfiguration.js";
import { messageFormat } from "../util/messageFormat.js";

const NOT_THE_EXPECTED_NUMBER_OF_TESTS = "expected {1} tests, got {2}";
export function checkNumberOfTests(
  config: CDDConfiguration,
  tested: number
): boolean {
  if (config.numberofTests !== undefined)
    if (tested !== Number(config.numberofTests)) {
      throw new Error(
        messageFormat(
          NOT_THE_EXPECTED_NUMBER_OF_TESTS,
          String(config.numberofTests),
          tested
        )
      );
    }
  return true;
}
