import { runAllContracts } from "src/runner/runAllContracts";

describe("Checking all contracts", () => {

     test("running contracts",   (done) => {
        const t = async (): Promise<void> => {
        try {
            const count =  await runAllContracts();
            expect(count).toBe(34);
            done()
        } catch(e) {
            done(e)
        }
    }
    void t()
    });
});


