import { type CDDConfiguration } from "../types/CDDConfiguration.js";
import { messageFormat } from "../util/messageFormat.js";
import { NOT_THE_EXPECTED_NUMBER_OF_TESTS } from "./Messages.js";

export class CheckNumberOfTestsService {
  checkNumberOfTests(config: CDDConfiguration, tested: number): boolean {
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
}
