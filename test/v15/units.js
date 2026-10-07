import app, { call } from "../../src/index.js";

const jsonOfTally = await app.tally.masters.unit.all("mani9");
console.log(jsonOfTally?.ENVELOPE?.BODY?.DATA?.COLLECTION);

// const xmlFromCall = await call("tally.company.fetch");
// console.log("Raw XML from Call:", typeof xmlFromCall === "string" && xmlFromCall.includes("<ENVELOPE>"));
