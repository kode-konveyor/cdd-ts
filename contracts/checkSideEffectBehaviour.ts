import { Contract } from "src/Contract";
import { SutType } from "src/SutType";
import { testedFunction } from "test/testedFunction";
import { testedContract } from "./CheckContract";
import { theRun, sideEffectChecks, RUN_IDENTIFICATION, failingSideEffectCheck } from "./CheckTestData";


export function checkSideEffectBehaviour(contract: Contract<SutType>) {
    contract
        .when(
            "a side effect definition does not hold",
            {
                setUp: () => {theRun.sideEffectChecks.push(failingSideEffectCheck)},
                tearDown: () => {theRun.sideEffectChecks.pop()}
            }
        )
        .ifCalledWith(testedFunction)
        .thenThrow("A 'side effect check: (name): did not hold' error is thrown",RUN_IDENTIFICATION+" side effect check: failing sideEffectCheck: did not hold")


        .when(
            "meanWhile is before the first ifCalledWith",
            {
                setUp: () => { theRun.sideEffectChecks = [], testedContract.sideEffectChecks = sideEffectChecks; },
                tearDown: () => { theRun.sideEffectChecks = sideEffectChecks; testedContract.sideEffectChecks = []; }
            }
        ).ifCalledWith(testedFunction)
        .thenReturn("the side effect check is done for all of the runs", 1)

        .when(
            "a global side effect does not hold",
            {
                setUp: () => {
                    theRun.parameters = [3, "a"];
                    theRun.returnValue = "3";
                    theRun.sideEffectChecks = [];
                    testedContract.sideEffectChecks = sideEffectChecks;
                },
                tearDown: () => {
                    theRun.parameters = [1, "a"];
                    theRun.returnValue = "1";
                    theRun.sideEffectChecks = sideEffectChecks;
                    testedContract.sideEffectChecks = [];
                }
            }
        ).ifCalledWith(testedFunction)
        .thenThrow("it throws the same error as a local one", RUN_IDENTIFICATION + " side effect check: logs to console: did not hold");
}
