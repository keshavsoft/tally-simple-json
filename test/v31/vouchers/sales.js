import { vouchers } from "../../../src/index.js";

const run = async () => {
    console.log("=== Testing tally-simple-json v31: vouchers (sales.fetch) ===");
    const res = await vouchers("sales.fetch", "mani9", "20260430", "20260430");
    console.log("Response type:", typeof res);
    console.log("Response keys:", Object.keys(res));
    console.log("Has ENVELOPE:", Boolean(res?.ENVELOPE));
    const vchList = res?.ENVELOPE?.BODY?.DATA?.COLLECTION?.VOUCHER;
    console.log("Is VOUCHER array:", Array.isArray(vchList));
    console.log("VOUCHER count:", Array.isArray(vchList) ? vchList.length : (vchList ? 1 : 0));
    console.log("First voucher sample:", JSON.stringify(Array.isArray(vchList) ? vchList[0] : vchList).slice(0, 300));
};

run().catch(console.error);
