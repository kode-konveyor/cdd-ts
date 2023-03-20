import { Contract } from "../src/contract/Contract.js";
import { diff } from "../src/util/diff.js";


export const diffContractParties = [diff]
export const diffContract = new Contract<typeof diff>()
    .setTitle("shows the difference between two strings")
    .ifCalledWith(()=>"hello\nworld\nhehe",()=> "hello\nword\nhehe")
    .thenReturn("returns the expected line striked through, and the actual line in bold",()=>"hello\n\n\u001b[43m\u001b[9mworld\n\u001b[29m\u001b[49m\n\u001b[43m\u001b[1mword\n\u001b[22m\u001b[49m\nhehe")