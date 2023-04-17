import equal from "fast-deep-equal";
import { ContractEntity } from "../types/ContractEntity.js";
import { messageFormat } from "../util/messageFormat.js";
import { type MethodType } from "../types/MethodType.js";
import { MORE_RETURN_VALUES_FOR_ONE_PARAMETER_SET_MESSAGE_FORMAT } from "./Messages.js";
import { getParametersFromGetters } from "../util/getParametersFromGetters.js";
import { CheckCurrentRunService } from "./CheckCurrentRunService.js";
import { serialize } from "../util/serialize.js";
import { type CaseDescriptorEntity } from "../types/CaseDescriptorEntity.js";

export class GetStubService<T extends MethodType> extends ContractEntity<T> {
  constructor(
    public checkCurrentRun = CheckCurrentRunService.prototype.checkCurrentRun
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
          equal(getParametersFromGetters(run.parameterGetters!), params)
        ) {
          if (run.thrown === undefined)
            retvals.push(run.returnValueGetter as ReturnType<T>);
          else throw new Error(String(run.thrown));
        }
      });
      if (retvals.length !== 1) {
        throw new Error(
          messageFormat(
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
