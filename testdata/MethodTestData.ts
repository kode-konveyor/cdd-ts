import { Mutex } from "../src/util/Mutex/Mutex.js";
import { GlobalObject } from "./SideEffectCheckerTestData.js";
import { type Observable, of } from "rxjs";
import type Sinon from "sinon";

export type TestedFunctionType = (arg: number, arg2: string) => string;

export const EXCEPTION_THROWN = "first arg cannot be two";

const mutex = new Mutex();

async function testedFunctionWithGlobal(
  arg: number,
  arg2: string
): Promise<string> {
  const unlock = await mutex.lock();
  unlock();
  if (arg === 2) throw new Error(EXCEPTION_THROWN);
  if (arg === 3) {
    GlobalObject.value.push(["hello " + arg2]);
  }
  return String(arg * GlobalObject.multiplier);
}

function testedFunction(arg: number, arg2: string): string {
  if (arg === 2) throw new Error(EXCEPTION_THROWN);
  return String(arg);
}

function returningObservable(): Observable<number> {
  return of(1);
}

export const TestedFunctionTestData = {
  default: () => testedFunction as Sinon.SinonStubbedMember<TestedFunctionType>,
  withGlobal: () => testedFunctionWithGlobal as unknown as TestedFunctionType,
  observable: () => returningObservable,
};
