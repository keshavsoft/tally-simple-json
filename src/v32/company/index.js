import { company as xmlCompany } from "tally-xml-tdl";
import parseXml from "../parseXml.js";

/**
 * Story: Fetch Company List as JSON
 * 
 * 1. Queries Tally for company data via tally-xml-tdl company() (0 external inputs).
 * 2. Converts the returned raw XML into JSON using fast-xml-parser.
 * 
 * Inputs: None (0 inputs)
 */
const company = async () => {
    const rawXml = await xmlCompany();

    return parseXml(rawXml);
};

export default company;
export { company };
