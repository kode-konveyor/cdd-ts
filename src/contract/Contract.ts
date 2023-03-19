import { meanwhile } from "./Meanwhile.js";
import { ContractEntity } from "../types/ContractEntity.js";
import { suchThat } from "./SuchThat.js";
import { MethodType } from "../types/MethodType.js";
import { thenReturn } from "./ThenReturn.js";
import { thenThrow } from "./ThenThrow.js";
import { when } from "./When.js";
import { getStub } from "./Stub.js";
import { setTitle } from "./SetTitle.js";
import { ifCalledWith } from "./IfCalledWith.js";
import { check } from "../check/Check.js";

export class Contract<T extends MethodType> extends ContractEntity<T>  {
    setTitle = setTitle<T, Contract<T>>
    when = when<T, Contract<T>>
    ifCalledWith = ifCalledWith<T, Contract<T>>
    thenReturn = thenReturn<T, Contract<T>>
    thenThrow = thenThrow<T, Contract<T>>
    suchThat = suchThat<T, Contract<T>>
    meanwhile = meanwhile<T, Contract<T>>
    getStub = (): T => getStub(this)
    check = check<T, Contract<T>>
}

