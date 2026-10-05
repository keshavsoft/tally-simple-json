/**
 * tally-simple-json (v7)
 *
 * Story of an Execution:
 *  Step 1: Identify the Command / Path
 *          (e.g. "tally.masters.stockGroup.withParent")
 *  Step 2: Validate against Structure
 *          (Confirm the path is defined in source.json with action: "fetch")
 *  Step 3: Extract & Validate Arguments
 *          (Extract company name, e.g. "mani9")
 *  Step 4: Dispatch to tally-simple
 *          (Fetch raw XML from Tally)
 *  Step 5: Parse with fast-xml-parser
 *          (Convert XML response to clean JSON and return)
 */

import tallySimple from "tally-simple";
import { XMLParser } from "fast-xml-parser";

import source from "../source.json" with { type: "json" };
import apiPaths from "./api.json" with { type: "json" };

const parser = new XMLParser({ ignoreAttributes: false });

/**
 * Step 2: Validate that the requested path exists in structure JSON (source.json)
 */
const validatePathInSource = ({ inSource, inPath }) => {
    const localSource = inSource;
    const localPath = inPath;

    const endpoint = localPath
        .split(".")
        .reduce((current, key) => current?.[key], localSource);

    return Boolean(endpoint && endpoint.action === "fetch");
};

/**
 * Resolves the query function on tally-simple
 */
const resolveTallySimpleFunction = ({ inClient, inPath }) => {
    const localClient = inClient;
    const localPath = inPath;

    const pathWithoutRoot = localPath.startsWith("tally.")
        ? localPath.slice("tally.".length)
        : localPath;

    return pathWithoutRoot
        .split(".")
        .reduce((current, key) => current?.[key], localClient);
};

/**
 * Creates the execution handler for a specific command path.
 */
const createCommandHandler = ({ inPath }) => {
    const localPath = inPath;

    return async (inCompany) => {
        // Step 1: Identify the command path
        const commandPath = localPath;

        // Step 2: Validate against structure (source.json)
        const isValid = validatePathInSource({
            inSource: source,
            inPath: commandPath
        });

        if (!isValid) {
            throw new Error(`Invalid or unsupported command path in source: ${commandPath}`);
        }

        // Step 3: Extract and validate the company argument
        if (typeof inCompany !== "string" || !inCompany.trim()) {
            throw new TypeError("Company name is required.");
        }
        const companyName = inCompany.trim();

        // Step 4: Dispatch to tally-simple to fetch XML
        const queryFn = resolveTallySimpleFunction({
            inClient: tallySimple,
            inPath: commandPath
        });

        if (typeof queryFn !== "function") {
            throw new TypeError(`Command not implemented in tally-simple: ${commandPath}`);
        }

        const xmlResponse = await queryFn(companyName);

        // Step 5: Parse XML to JSON and return
        return parser.parse(xmlResponse);
    };
};

/**
 * Builds the nested API structure from the allowlist in api.json
 */
const createApi = () => {
    const root = {};

    for (const path of apiPaths) {
        const parts = path.split(".");
        let current = root;

        parts.forEach((part, index) => {
            const isLast = index === parts.length - 1;

            if (isLast) {
                current[part] = createCommandHandler({ inPath: path });
                return;
            }

            current[part] ??= {};
            current = current[part];
        });
    }

    const rootName = apiPaths[0]?.split(".")[0];

    return rootName ? root[rootName] : root;
};

export default createApi();
