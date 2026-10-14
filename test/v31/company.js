import { company } from "../../src/index.js";

const run = async () => {
    const comp = await company();
    console.log("comp : ", comp);
};

run().catch(console.error);
