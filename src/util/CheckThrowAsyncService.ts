import { type MethodType } from "../types/MethodType.js";

export class CheckThrowAsyncService {
  async checkThrowAsync<T extends MethodType, R>(
    funktion: T,
    params: Parameters<T>,
    matchString: string,
    toReturn: R
  ): Promise<R> {
    try {
      await funktion(...params);
      throw new Error("no exception was thrown");
    } catch (catched) {
      if (String(catched).match(matchString) != null) return toReturn;
      throw catched;
    }
  }
}
