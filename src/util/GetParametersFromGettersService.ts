export class GetParametersFromGettersService {
  getParametersFromGetters(getters: Array<() => unknown>): Array<unknown> {
    return getters.map((x) => {
      return x();
    });
  }
}
