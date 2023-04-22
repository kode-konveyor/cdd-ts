import { type Observable, of } from "rxjs";
import { Contract } from "../src/contract/Contract.js";
import { TestedFunctionTestData } from "../testdata/MethodTestData.js";
import { ReturnValueCheckTestData } from "../testdata/ReturnValueCheckTestData.js";

export const testedFunctionWithObservableContractParties = [
  TestedFunctionTestData.observable(),
];

export const testedFunctionWithObservableContract = new Contract<
  () => Observable<number>
>()
  .setTitle("A nice tested function returning observable")
  .ifCalledWith()
  .thenReturn("returns the first parameter as string", {
    default: () => of(1),
    check: ReturnValueCheckTestData.theFirstvalueIsOne,
  });
