
export async function asyncFunc() {
    const p = new Promise(resolve => {
        setTimeout(() => {
            resolve(8);
        }, 2000);
    });
    return await p;
}
