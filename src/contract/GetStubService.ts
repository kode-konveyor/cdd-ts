import equal from "fast-deep-equal";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { MORE_RETURN_VALUES_FOR_ONE_PARAMETER_SET_MESSAGE_FORMAT } from "./Messages.js";
import { GetParametersFromGettersService } from "../util/GetParametersFromGettersService.js";
import { CheckCurrentRunService } from "./CheckCurrentRunService.js";
import { serialize } from "../util/serialize.js";
import { type CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";
import { MessageFormatService } from "../util/messageFormat.js";

export class GetStubService<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly checkCurrentRun = CheckCurrentRunService.prototype.checkCurrentRun,
    readonly getParametersFromGetters = GetParametersFromGettersService
      .prototype.getParametersFromGetters,
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat
  ) {
    super();
  }

  getStub(caseName?: string): T {
    this.checkCurrentRun();
    if (caseName == null) caseName = "";
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const currentCase = this.cases[caseName] as CaseDescriptorEntity<T>;
    if (currentCase?.runs == null)
      throw new Error("no runs in the case" + serialize(this));
    const stub = (...params: Parameters<T>): ReturnType<T> => {
      const retvals: Array<ReturnType<T>> = [];
      currentCase.runs.forEach((run) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (
          run.returnValueChecks.length > 0 ||
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          equal(this.getParametersFromGetters(run.parameterGetters!), params)
        ) {
          if (run.thrown === undefined)
            retvals.push(run.returnValueGetter as ReturnType<T>);
          else throw new Error(String(run.thrown));
        }
      });
      if (retvals.length !== 1) {
        throw new Error(
          this.messageFormat(
            MORE_RETURN_VALUES_FOR_ONE_PARAMETER_SET_MESSAGE_FORMAT,
            serialize(params),
            retvals.length.toString()
          )
        );
      }
      return (retvals[0] as T)();
    };
    return stub as T;
  }
}
