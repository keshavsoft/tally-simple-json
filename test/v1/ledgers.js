import tally from "../../src/index.js";

const data = await tally.masters.ledgers.withGstDetails("mani9");

console.log("ledgers : ", data);
