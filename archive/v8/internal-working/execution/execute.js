import tallySimple from "tally-simple";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({ ignoreAttributes: false });

/**
 * Validates that the requested route path exists in source.json and is executable.
 */
const validateRouteInSource = ({ inSource, inRoutePath }) => {
    const localSource = inSource;
    const localRoutePath = inRoutePath;

    const endpoint = localRoutePath
        .split(".")
        .reduce((current, key) => current?.[key], localSource);

    return Boolean(endpoint && endpoint.action === "fetch");
};

/**
 * Resolves the matching query function on tally-simple.
 */
const resolveTallySimpleFunction = ({ inClient, inRoutePath }) => {
    const localClient = inClient;
    const localRoutePath = inRoutePath;

    const pathWithoutRoot = localRoutePath.startsWith("tally.")
        ? localRoutePath.slice("tally.".length)
        : localRoutePath;

    return pathWithoutRoot
        .split(".")
        .reduce((current, key) => current?.[key], localClient);
};

/**
 * Execution Engine:
 *  1. Validates the route against source.json.
 *  2. Validates company argument.
 *  3. Dispatches query to tally-simple to fetch raw XML.
 *  4. Parses raw XML to JSON and returns it.
 */
const execute = async ({ inRoutePath, inCompany, inSource }) => {
    const localRoutePath = inRoutePath;
    const localCompany = inCompany;
    const localSource = inSource;

    // Step 1: Validate route against source specification
    const isValid = validateRouteInSource({
        inSource: localSource,
        inRoutePath: localRoutePath
    });

    if (!isValid) {
        throw new Error(`Route not supported in source specification: ${localRoutePath}`);
    }

    // Step 2: Validate company name
    if (typeof localCompany !== "string" || !localCompany.trim()) {
        throw new TypeError("Company name is required.");
    }
    const companyName = localCompany.trim();

    // Step 3: Dispatch to tally-simple to fetch raw XML
    const queryFn = resolveTallySimpleFunction({
        inClient: tallySimple,
        inRoutePath: localRoutePath
    });

    if (typeof queryFn !== "function") {
        throw new TypeError(`Route not implemented in tally-simple: ${localRoutePath}`);
    }

    const xmlResponse = await queryFn(companyName);

    // Step 4: Parse XML to JSON
    return parser.parse(xmlResponse);
};

export default execute;
