import { asyncFunc } from "../src/asyncFunc";


describe("Testing an async function", () => {

     test("the test", async () => {
        return asyncFunc().then(count =>
            expect(count ).toBe(8)
        )
    });
});


