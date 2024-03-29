import { type CaseDescriptorEntity } from "../src/types/CaseDescriptorEntity.js";
import { type ContractEntity } from "../src/types/ContractEntity.js";
import { type MethodType } from "../src/types/MethodType.js";
import { type RunDescriptorEntity } from "../src/types/RunDescriptorEntity.js";
import { DiffService } from "../src/util/DiffService.js";
import { GetParametersFromGettersService } from "../src/util/GetParametersFromGettersService.js";
import { serialize } from "../src/util/serialize.js";
import { CheckThrowService } from "../src/util/CheckThrowService.js";
import { FunctionAnnotationtestData } from "./FunctionAnnotationtestData.js";
import { type TestedFunctionType } from "./MethodTestData.js";
import { ParameterTestData } from "./ParameterTestData.js";
import { getReturnValueTestData } from "./ReturnValueTestData.js";
import { type TestDataDescriptor } from "src/types/TestDataDescriptor.js";
import { type CDDConfiguration } from "../src/types/CDDConfiguration.js";
import { type WhenService } from "../src/contract/WhenService.js";
import { LabelTestdata } from "./LabelTestdata.js";
import { type TestData } from "../src/types/TestData.js";
import { type Observable, firstValueFrom } from "rxjs";
import type Sinon from "sinon";
import { SerializedTestdata } from "./SerializedTestdata.js";

const checkThrow = new CheckThrowService().checkThrow;
const diff = new DiffService().diff;
const getParametersFromGetters = new GetParametersFromGettersService()
  .getParametersFromGetters;
const NOT_DEFINED_EXACTLY_ONCE = `those parameters are not defined exactly once for this case:
\\[
 3,
 "b"
]
checked:
\\[
 \\[
  "run explanation",
  \\[
   1,
   "b"
  ]
 ],
 \\[
  "run explanation",
  \\[
   1,
   "b"
  ]
 ]
]`;
export const ReturnValueCheckTestData = {
  annotateFunctionDefault: forFunctionAnnotation(
    FunctionAnnotationtestData.default
  ),
  annotateFunctionGetter: forFunctionAnnotation(
    FunctionAnnotationtestData.getter
  ),
  putTotheCurrentCaseAtZero: putTotheCurrentCase(0),
  putTotheCurrentCaseAtOne: putTotheCurrentCase(1),
  currentRunIsCleared,
  neitherReturnNorThrown,
  stubReturnsDefinedReturnValue: (stub: TestedFunctionType) => {
    return stub(
      ...(getParametersFromGetters(ParameterTestData.default()) as [
        number,
        string
      ])
    ) === getReturnValueTestData.getReturnValue()
      ? undefined
      : "oops";
  },
  stubIsSinonStub: (
    stub: Sinon.SinonStubbedMember<TestedFunctionType>
  ): string | undefined => {
    stub(ParameterTestData.defaultFirst(), ParameterTestData.defaultSecond());
    if (!(serialize(stub.args) === SerializedTestdata.args))
      return serialize(stub.args);
    return undefined;
  },
  mixinStubReturnsDefinedReturnValue: (
    stub: (this: number, arg2: string) => string
  ) => {
    return stub.call(
      ...(getParametersFromGetters(ParameterTestData.default()) as [
        number,
        string
      ])
    ) === getReturnValueTestData.getReturnValue()
      ? undefined
      : "oops";
  },
  stubThrowsException: (stub: TestedFunctionType) => {
    checkThrow(
      stub,
      getParametersFromGetters(ParameterTestData.exceptionThrowing()) as [
        number,
        string
      ],
      LabelTestdata.exceptionThrown(),
      undefined
    );
  },
  stubThrowsNoRunException: (stub: TestedFunctionType) => {
    checkThrow(
      stub,
      getParametersFromGetters(ParameterTestData.exceptionThrowing()) as [
        number,
        string
      ],
      LabelTestdata.norunException(),
      undefined
    );
  },
  stubReturnsOne: (stub: TestedFunctionType) => {
    const ret = stub(
      ...(getParametersFromGetters(ParameterTestData.exceptionThrowing()) as [
        number,
        string
      ])
    );
    return ret === "1" ? undefined : ret;
  },
  stubThrowsMultipleDefinedParameterException: (stub: TestedFunctionType) => {
    checkThrow(
      stub,
      getParametersFromGetters(ParameterTestData.withSideEffects()) as [
        number,
        string
      ],
      NOT_DEFINED_EXACTLY_ONCE,
      undefined
    );
  },
  makeTestDataLeakTest: (
    value: TestData<CDDConfiguration, TestDataDescriptor<CDDConfiguration>>
  ): void => {
    // @ts-expect-error checking for the impossible
    if (value["getOne"]().moduleResolution !== "") {
      throw new Error("leak detected");
    }
  },
  newCaseChecker: (
    returnValue: ContractEntity<typeof WhenService.prototype.when.call>
  ): "no case added" | undefined => {
    if (returnValue.cases[LabelTestdata.caseName()] != null) return undefined;
    return "no case added";
  },
  currentCaseChecker: (
    returnValue: ContractEntity<typeof WhenService.prototype.when.call>
  ): "currentCase is not the expected" | undefined => {
    if (returnValue.currentCase === LabelTestdata.caseName()) return undefined;
    return "currentCase is not the expected";
  },

  failing: () => () => "returnvalue check failure",
  passing: () => () => undefined,
  returnValueIsStringOfParameter: (returnValue: string, parameters: unknown) =>
    returnValue === String(parameters) ? undefined : "fail",
  theFirstvalueIsOne: async (returnValue: Observable<number>) => {
    const h = await firstValueFrom(returnValue);
    if (h === 1) return undefined;
    return "not one";
  },
};

function forFunctionAnnotation(name: string) {
  return (returnValue: () => unknown) => {
    const annotation = (returnValue as unknown as { displayName: string })
      .displayName;
    if (annotation !== name) throw Error(diff(name, annotation));
  };
}

function putTotheCurrentCase(runNumber: number) {
  return (
    returnValue: ContractEntity<MethodType>,
    contract: ContractEntity<MethodType>
  ) =>
    (
      (contract.cases[""] as CaseDescriptorEntity<MethodType>).runs[
        runNumber
      ] as RunDescriptorEntity<MethodType>
    ).explanation === LabelTestdata.runExplanation()
      ? undefined
      : serialize(contract);
}

function currentRunIsCleared(
  retval: ContractEntity<MethodType>,
  contract: ContractEntity<MethodType>
): RunDescriptorEntity<MethodType> | undefined {
  return contract.currentRun;
}

function neitherReturnNorThrown(
  contract: ContractEntity<MethodType>
): "not this case" | undefined {
  const c = contract;
  if (
    c.currentRun != null &&
    c.currentRun.thrown === undefined &&
    c.currentRun.returnValueGetter === undefined
  )
    return undefined;
  return "not this case";
}
