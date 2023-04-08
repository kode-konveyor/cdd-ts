import { Contract } from "../../src/contract/Contract.js";
import { diff } from "../../src/util/diff.js";
import { DiffResultTestData } from "../DiffResultTestData.js";
import { DiffTestData } from "../DiffTestData.js";

export const oneContractParties = [diff];
export const oneContract = new Contract<typeof diff>()
  .setTitle("shows the difference between two strings")
  .ifCalledWith(DiffTestData.world, DiffTestData.word)
  .thenReturn(
    "returns the expected line striked through, and the actual line in bold",
    DiffResultTestData.world
  );
