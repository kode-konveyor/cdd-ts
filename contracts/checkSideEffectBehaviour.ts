import { Contract } from "src/contract/Contract";
import { testedFunction } from "test/testedFunction";
import { RUN_IDENTIFICATION, getContractWithFailingSideEffectCheck, getContractWithGlobalSideEffectCheck, getContractWithGlobalSideEffectCheckNotHolding } from "./ContractTestdata";


export function checkSideEffectBehaviour(contract: Contract<(contract: Contract<typeof testedFunction>,fun: typeof testedFunction) =>number>):void {
    contract
        .ifCalledWith(getContractWithFailingSideEffectCheck(),testedFunction)
        .thenThrow(
            "In case a side effect check fails, a 'side effect check: (name): did not hold' error is thrown",
            RUN_IDENTIFICATION+" side effect check: failing sideEffectCheck: did not hold")


        .ifCalledWith(getContractWithGlobalSideEffectCheck(),testedFunction)
        .thenReturn(
            "In case a side effect check is defined globally (before the first ifCalledWith), the side effect check is done for all of the runs",
            1)

        .ifCalledWith(getContractWithGlobalSideEffectCheckNotHolding(),testedFunction)
        .thenThrow(
            "A global side effect check throws the same error as a local one",
            RUN_IDENTIFICATION + " side effect check: logs to console: did not hold");
}
