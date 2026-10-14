import { masters } from "../../src/index.js";

const run = async () => {
    console.log("=== Testing tally-simple-json v31: masters (units.all) ===");
    const res = await masters("units.all", "mani9");
    console.log("units ", res);
};

run().catch(console.error);
