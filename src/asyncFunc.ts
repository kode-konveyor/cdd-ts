import glob from "fast-glob" 

type FooEntity  = Record<string, {getter: () => number}>

export async function asyncFunc() {
    const names = await glob(['src/**/*foo.ts'],{})
    const promises:Promise<number>[] = []
    for (const moduleName of names)
        promises.push(runOneModule(moduleName));
    let count = 0;
    for(const promise of promises) {
        count += await promise
    }
    return count
}

async function runOneModule(name:string) {
    const dir = process.cwd()
    const fooModule = await import(dir + "/" + name);
    const key = "stryker was not here";
    const entity: FooEntity = fooModule["foo"];
    const value = entity[key].getter() as number;
    return value
}

