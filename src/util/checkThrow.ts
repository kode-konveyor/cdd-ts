import { type MethodType } from "../types/MethodType.js";

export function checkThrow<T extends MethodType, R>(
  funktion: T,
  params: Parameters<T>,
  matchString: string,
  toReturn: R
): R {
  try {
    funktion(...params);
    throw new Error("no exception was thrown");
  } catch (catched) {
    if (String(catched).match(matchString) != null) return toReturn;
    throw catched;
  }
}
