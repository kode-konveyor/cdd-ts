import { BoundService } from "./util/BoundService.js";
import { BoundCallService } from "./util/BoundCallService.js";
import { DiffService } from "./util/DiffService.js";
import { MessageFormatService } from "./util/messageFormat.js";
export { MakeTestDataService } from "./util/MakeTestDataService.js";
export { AnnotateFunctionService } from "./util/AnnotateFunctionService.js";
export { CheckThrowAsyncService } from "./util/CheckThrowAsyncService.js";
export { CheckThrowService } from "./util/CheckThrowService.js";
export { GetParametersFromGettersService } from "./util/GetParametersFromGettersService.js";
export { MakeGettersService } from "./util/MakeGettersService.js";
export { DiffService } from "./util/DiffService.js";
export { DeepCopyService } from "./util/DeepCopyService.js";
export { ConsoleLogChecker } from "./util/ConsoleLogChecker/ConsoleLogChecker.js";
export { Mutex } from "./util/Mutex/Mutex.js";
export { serialize } from "./util/serialize.js";
export { Contract } from "./contract/Contract.js";

export const bound = new BoundService().bound;
export const boundCall = bound<BoundCallService["boundCall"]>(BoundCallService);
export const diff = bound(DiffService);
export const messageFormat =
  bound<MessageFormatService["messageFormat"]>(MessageFormatService);
