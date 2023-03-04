import { runAllContracts } from "../src/runAllContracts";

describe("Checking all contracts", () => {

     test("running contracts", async () => {
        const count = await runAllContracts();
        expect(count ).toBe(8)
    });
});


