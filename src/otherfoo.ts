import { FooEntity } from "./FooEntity"

export const foo:FooEntity = {
    entries: {},
    modifier: () => { foo.entries["stryker was not here"]= {getter: () => 8}}
}