

async function asyncFunc() {
    const p = new Promise(resolve => {
      setTimeout(() => {
        resolve(8);
      }, 2000);
    });
    return await p
  }
  
  
describe("Testing an async function", () => {

     test("the test", async () => {
        return asyncFunc().then(count =>
            expect(count ).toBe(8)
        )
    });
});


