import { vouchers as xmlVouchers } from "tally-xml-tdl";
import parseXml from "../parseXml.js";

/**
 * Story: Fetch Vouchers from Tally as JSON
 * 
 * 1. Calls tally-xml-tdl vouchers(path, company, fromDate, toDate) to fetch raw XML.
 * 2. Converts the raw XML response into JSON using fast-xml-parser.
 * 
 * Inputs:
 * - path: The voucher route defined in JSON (e.g. "sales.fetch", "purchases.fetch")
 * - company: The target company name (e.g. "mani9")
 * - fromDate: Period start date (e.g. "20260401")
 * - toDate: Period end date (e.g. "20260401")
 */
const vouchers = async (path, company, fromDate, toDate) => {
    const rawXml = await xmlVouchers(path, company, fromDate, toDate);

    return parseXml(rawXml);
};

export default vouchers;
export { vouchers };
