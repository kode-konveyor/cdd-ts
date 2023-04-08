export class Mutex {
    current :Promise<unknown>;
    _unlock?: (() => void) | PromiseLike<() => void>;

    constructor() {
        this.current = Promise.resolve();
    }

    lock: () => Promise<() => void> = async () => {
        let _resolve: () => void;
        const p = new Promise<void>(resolve => {
            _resolve = () => resolve();
        });
        const rv = this.current.then(() => _resolve);
        this.current = p;
        this._unlock = await rv;
        return this._unlock;
    };

    unlock:()=>void = () => {
        (this._unlock as ()=>void)()
    }
}