export function getFormatParametersList(): Array<() => string> {
    return [() => "hihi", () => "hehe"];
}
export function getFormatParametersStructured(): { egyik: string; masik: string; } {
    return {
        egyik: "hihi",
        masik: "hehe"
    };
}

export const FormatStringTestData = {
    default: () => "{1}: {2}",
    multiple: () => "{egyik}: {masik}{egyik}",
    referencing: () => "{egyik}: {masik}",
    formatted: () =>  "hihi: hehe",
    formattedMultiple: () => "hihi: hehehihi",
    parametersAsListOne: () => "hihi",
    parametersAsListTwo: () => "hehe",
    parametersAsObject: () => {return {
        egyik: "hihi",
        masik: "hehe"
    }}
}