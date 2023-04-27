import equal from "fast-deep-equal";
import { ContractEntity } from "../types/ContractEntity.js";
import { type MethodType } from "../types/MethodType.js";
import { MORE_RETURN_VALUES_FOR_ONE_PARAMETER_SET_MESSAGE_FORMAT } from "./Messages.js";
import { GetParametersFromGettersService } from "../util/GetParametersFromGettersService.js";
import { CheckCurrentRunService } from "./CheckCurrentRunService.js";
import { serialize } from "../util/serialize.js";
import { type CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";
import { MessageFormatService } from "../util/messageFormat.js";
import { GetCaseToStubService } from "./GetCaseToStubService.js";

export class GetStubService<T extends MethodType> extends ContractEntity<T> {
  constructor(
    readonly checkCurrentRun = CheckCurrentRunService.prototype.checkCurrentRun,
    readonly getParametersFromGetters = GetParametersFromGettersService
      .prototype.getParametersFromGetters,
    private readonly messageFormat = MessageFormatService.prototype
      .messageFormat,
    private readonly getCaseToStub = GetCaseToStubService.prototype
      .getCaseToStub
  ) {
    super();
  }

  getStub(): T {
    this.checkCurrentRun();
    const caseName = this.getCaseToStub();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const currentCase = this.cases[caseName] as CaseDescriptorEntity<T>;
    if (currentCase?.runs == null)
      throw new Error("no runs in the case" + serialize(this));
    const stub = (...params: Parameters<T>): ReturnType<T> => {
      const retvals: Array<ReturnType<T>> = [];
      const checkedParams: Array<[string, Parameters<T>]> = [];
      for (const run of currentCase.runs) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const runParams = this.getParametersFromGetters(run.parameterGetters!);
        if (run.parameterCheck !== undefined) {
          if (run.parameterCheck(...params) === undefined) {
            return (run.returnValueGetter as ReturnType<T>)();
          }
        }
        if (equal(runParams, params)) {
          if (run.thrown === undefined)
            retvals.push(run.returnValueGetter as ReturnType<T>);
          else throw new Error(String(run.thrown));
        }
        checkedParams.push([run.explanation, runParams as Parameters<T>]);
      }
      if (retvals.length !== 1) {
        throw new Error(
          this.messageFormat(
            MORE_RETURN_VALUES_FOR_ONE_PARAMETER_SET_MESSAGE_FORMAT,
            serialize(params),
            serialize(checkedParams)
          )
        );
      }
      return (retvals[0] as T)();
    };
    return stub as T;
  }
}
