import { runAllContracts } from "../src/runAllContracts";

describe("Checking all contracts", () => {

     test("running contracts", async () => {
        return runAllContracts().then( count =>
            expect(count).toBe(13)
        )
    });
});


