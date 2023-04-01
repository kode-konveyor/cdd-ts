
export function getReturnValueCheckFailing(): [string, (returnValue: string, arg: number, arg2: string) => unknown] {
    return [
        "fail",
        () =>"returnvalue check failure"
    ];
}
