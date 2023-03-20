import { Contract } from "../src/contract/Contract.js";
import { annotateFunction } from "../src/util/annotateFunction.js";
import { serialize } from "../src/util/serialize.js";


export const serializeContractParties = [serialize]
export const serializeContract = new Contract<typeof serialize>()
    .setTitle("serializes data JSON-like")
    .ifCalledWith(() => {
        return {
        a: "foo",
         b: ()=> {
            const egy = 1
            return String(egy)
         },
         c: annotateFunction(()=>String(1))
        }})
    .thenReturn("the fields are serialized to json, plus the functions with their displayName or toString",() =>'{\n "a": "foo",\n "b": "() => { const egy = 1; return String(egy); }",\n "c": "() => \\"1\\""\n}')
