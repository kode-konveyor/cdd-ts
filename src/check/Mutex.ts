
export class Mutex {
    current :Promise<unknown>;

    constructor() {
        this.current = Promise.resolve();
    }

    lock: () => Promise<() => void> = async () => {
        let _resolve: () => void;
        const p = new Promise<void>(resolve => {
            _resolve = () => resolve();
        });
        // Caller gets a promise that resolves when the current outstanding
        // lock resolves
        const rv = this.current.then(() => _resolve);
        // Don't allow the next request until the new promise is done
        this.current = p;
        // Return the new promise
        return await rv;
    };
}