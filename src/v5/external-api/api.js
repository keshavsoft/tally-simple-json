/**
 * tally-simple-json
 *
 * A minimal JSON layer over Tally HTTP API:
 *  1. tally-simple    - sends collection TDL to Tally and returns raw XML response.
 *  2. fast-xml-parser - parses the XML text into clean JavaScript JSON objects.
 */

import tallySimple from "tally-simple";
import { XMLParser } from "fast-xml-parser";

import apiPaths from "./api.json" with { type: "json" };

const parser = new XMLParser({ ignoreAttributes: false });

/**
 * Resolves a nested query path (e.g. "tally.masters.units.fetch")
 * on the underlying tally-simple client.
 */
const getByPath = ({ inObject, inPath }) => {
    const localObject = inObject;
    const localPath = inPath;

    const direct = localPath
        .split(".")
        .reduce((current, key) => current?.[key], localObject);

    if (typeof direct === "function") {
        return direct;
    }

    const withoutRoot = localPath.startsWith("tally.")
        ? localPath.slice("tally.".length)
        : localPath;

    return withoutRoot
        .split(".")
        .reduce((current, key) => current?.[key], localObject);
};

/**
 * Creates a JSON query function for a given API path.
 * Queries Tally via tally-simple and parses the returned XML into JSON.
 */
const createFunction = (path) => async (company) => {
    if (typeof company !== "string" || !company.trim()) {
        throw new TypeError("Company name is required.");
    }

    const fn = getByPath({ inObject: tallySimple, inPath: path });

    if (typeof fn !== "function") {
        throw new TypeError(`Endpoint not found: ${path}`);
    }

    const xml = await fn(company.trim());

    return parser.parse(xml);
};

/**
 * Builds the nested API client shape from the allowlist in api.json.
 */
const createApi = () => {
    const root = {};

    for (const path of apiPaths) {
        const parts = path.split(".");
        let current = root;

        parts.forEach((part, index) => {
            const isLast = index === parts.length - 1;

            if (isLast) {
                current[part] = createFunction(path);
                return;
            }

            current[part] ??= {};
            current = current[part];
        });
    }

    const rootName = apiPaths[0]?.split(".")[0];

    return rootName ? root[rootName] : root;
};

export { createApi };
export default createApi();
