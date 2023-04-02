import { Contract } from "../src/contract/Contract.js";
import { serialize } from "../src/util/serialize.js";
import { SerializedTestdata } from "../testdata/SerializedTestdata.js";
import { SerializableTestData } from "../testdata/SerializableTestdata.js";


export const serializeContractParties = [serialize]

export const serializeContract = new Contract<typeof serialize>()
    .setTitle("serializes data JSON-like")
    .ifCalledWith(SerializableTestData.objectWithFunctions)
    .thenReturn("the fields are serialized to json, plus the functions with their displayName or toString", SerializedTestdata.serializedObjectWithFunctions)
    .ifCalledWith(SerializableTestData.error)
    .thenReturn("can serialize error", SerializedTestdata.serializedError)
    .ifCalledWith(SerializableTestData.complexObject)
    .thenReturn("correctly serializes complex objects",SerializedTestdata.serializedComplexObject)
    .ifCalledWith(SerializableTestData.circular)
    .thenReturn("circular objects are serialized with a marker denoting the point of circulation", SerializedTestdata.serializedCircularObject)
    .ifCalledWith(SerializableTestData.empty)
    .thenReturn("empty object serializes to '{}'", SerializedTestdata.serializedEmpty)


