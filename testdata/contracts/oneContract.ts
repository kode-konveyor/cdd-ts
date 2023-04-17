import { Contract } from "../../src/contract/Contract.js";
import { DiffService } from "../../src/util/DiffService.js";
import { DiffResultTestData } from "../DiffResultTestData.js";
import { DiffTestData } from "../DiffTestData.js";

export const oneContractParties = [new DiffService().diff];
export const oneContract = new Contract<typeof DiffService.prototype.diff>()
  .setTitle("shows the difference between two strings")
  .ifCalledWith(DiffTestData.world, DiffTestData.word)
  .thenReturn(
    "returns the expected line striked through, and the actual line in bold",
    DiffResultTestData.world
  );
