export function getReturnValue(): string {
    return "1";
}



export function getReturnValueOther() {
    return () => "2";
}

export function getReturnValueSideEffect(): string {
    return "3";
}
