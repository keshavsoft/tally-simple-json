import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({ ignoreAttributes: false });

/**
 * Story: Parse Tally XML to JSON
 * 
 * Takes raw XML string returned by Tally and parses it into a JavaScript object.
 * 
 * Inputs:
 * - xml: Raw XML string from Tally response
 */
const parseXml = (xml) => {
    return parser.parse(xml);
};

export default parseXml;
export { parseXml };
