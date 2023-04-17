import { Mutex } from "../util/Mutex.js";

export const checkServiceMutex = new Mutex();
export const NO_CHECKS_IN_CONTRACT = "no checks in contract {1}";
export const UNDEFINED_AS_STRING = "undefined";
export const EMPTY_STRING = "";
export const sideEffectMutex = new Mutex();
