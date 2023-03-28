
export function getReturnValueCheckFailing(): [string, (returnValue: string, arg: number, arg2: string) => unknown] {
    return [
        "fail",
        (a, b) =>"returnvalue check failure"
    ];
}
