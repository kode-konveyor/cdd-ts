import { runAllContracts } from "src/runAllContracts";

describe("Checking all contracts", () => {

     test("running contracts",   (done) => {
        const t = async () => {
        try {
            const count =  await runAllContracts();
            expect(count).toBe(12);
            done()
        } catch(e) {
            done(e)
        }
    }
    t()
    });
});


