import { meanwhile } from "./Meanwhile";
import { ContractEntity } from "./ContractEntity";
import { suchThat } from "./SuchThat";
import { SutType } from "./SutType";
import { thenReturn } from "./ThenReturn";
import { thenThrow } from "./ThenThrow";
import { when } from "./When";
import { stub } from "./Stub";
import { setTitle } from "./SetTitle";
import { ifCalledWith } from "./IfCalledWith";
import { check } from "../check/Check";

export class Contract<T extends SutType> extends ContractEntity<T>  {
    setTitle = setTitle<T,Contract<T>>
    when = when<T,Contract<T>>
    ifCalledWith = ifCalledWith<T,Contract<T>>
    thenReturn = thenReturn<T,Contract<T>>
    thenThrow = thenThrow<T,Contract<T>>
    suchThat = suchThat<T,Contract<T>>
    meanwhile = meanwhile<T,Contract<T>>
    stub = stub<T,Contract<T>>
    check = check<T,Contract<T>>
}

