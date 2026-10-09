import { masters } from "../../src/index.js";

const run = async () => {
    console.log("=== Testing tally-simple-json v31: masters (units.all) ===");
    const res = await masters("units.all", "mani9");
    console.log("Response type:", typeof res);
    console.log("Response keys:", Object.keys(res));
    console.log("Has ENVELOPE:", Boolean(res?.ENVELOPE));
    console.log("Snippet:", JSON.stringify(res).slice(0, 300));
};

run().catch(console.error);
