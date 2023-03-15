
interface Options {
    opt: boolean;
};
interface Person {
    name: string
}

type GetType = (url: string, options?: Options ) => Person

type AsGetters<T extends Array<unknown>> = {
    [K in keyof T]: () => T[K]
    }
type MethodType = (...args: any[]) => any

// makes paramgetters never
// type ParameterGetters<T extends MethodType> = Extract<AsGetters<Parameters<T>>, Array<()=>unknown>>

// makes (x: () => any) => x() to fail with Type 'unknown' is not assignable to type '() => any'
    type ParameterGetters<T extends MethodType> = Extract<AsGetters<Parameters<T>>, Array<unknown>>

type paramGetters = ParameterGetters<GetType>

const options: Options = { opt: true}

const foo: paramGetters = [()=>"a", ()=>options ]
function handleRun <T extends MethodType>(
    parameterGetters: ParameterGetters<T>
): void {
    const parameters = parameterGetters.map((x: () => any) => x()) as Parameters<T>

    console.log(parameters)
}

console.log(handleRun,foo)
function bar():undefined {
    return undefined
}
const baz = ():undefined => undefined
console.log([undefined],[bar()],[baz()])