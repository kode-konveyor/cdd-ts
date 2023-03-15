import { meanwhile } from "./Meanwhile";
import { ContractEntity } from "./ContractEntity";
import { suchThat } from "./SuchThat";
import { MethodType } from "./MethodType";
import { thenReturn } from "./ThenReturn";
import { thenThrow } from "./ThenThrow";
import { when } from "./When";
import { getStub } from "./Stub";
import { setTitle } from "./SetTitle";
import { ifCalledWith } from "./IfCalledWith";
import { check } from "../check/Check";

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

