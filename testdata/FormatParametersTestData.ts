export function getFormatParametersList(): Array<() => string> {
    return [() => "hihi", () => "hehe"];
}
export function getFormatParametersStructured(): { egyik: string; masik: string; } {
    return {
        egyik: "hihi",
        masik: "hehe"
    };
}
