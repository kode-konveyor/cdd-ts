export function getParametersFromGetters(getters: Array<() => unknown>): Array<unknown> {
    return getters.map(x => x());
}
