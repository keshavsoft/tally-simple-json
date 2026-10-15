import { masters as xmlMasters } from "tally-xml-tdl";
import parseXml from "../parseXml.js";

/**
 * Story: Fetch Masters from Tally as JSON
 * 
 * 1. Calls tally-xml-tdl masters(path, company) to resolve schema and fetch XML.
 * 2. Converts the raw XML response into JSON using fast-xml-parser.
 * 
 * Inputs:
 * - path: The master sub-route defined in JSON (e.g. "units.all", "stockItems.withBatches")
 * - company: The target company name (e.g. "mani9")
 */
const masters = async (path, company) => {
    const rawXml = await xmlMasters(path, company);

    return parseXml(rawXml);
};

export default masters;
export { masters };
