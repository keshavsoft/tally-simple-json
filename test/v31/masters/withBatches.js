import { masters } from "../../../src/index.js";

const run = async () => {
    const res = await masters("stockItems.withBatches", "mani9");
    console.log("units ", res);
};

run().catch(console.error);
