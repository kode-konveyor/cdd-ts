import { type Observable, firstValueFrom, of } from "rxjs";
import { Contract } from "../src/contract/Contract.js";
import { TestedFunctionTestData } from "../testdata/MethodTestData.js";

export const testedFunctionWithObservableContractParties = [
  TestedFunctionTestData.observable(),
];

export const testedFunctionWithObservableContract = new Contract<
  () => Observable<number>
>()
  .setTitle("A nice tested functions")
  .ifCalledWith()
  .thenReturn("returns the first parameter as string", () => of(1))
  .suchThat(
    "the return value is an observable returning one",
    async (returnValue) => {
      const h = await firstValueFrom(returnValue);
      if (h === 1) return undefined;
      return "not one";
    }
  );
