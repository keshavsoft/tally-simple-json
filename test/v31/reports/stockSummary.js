import { reports } from "../../../src/index.js";

const run = async () => {
    const res = await reports("stockSummary.fetch", "mani9");
    console.log("units ", res);
};

run().catch(console.error);
