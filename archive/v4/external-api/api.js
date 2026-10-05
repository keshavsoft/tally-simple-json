import tallySimple, { createTallyClient } from "tally-simple";
import { XMLParser } from "fast-xml-parser";

import apiPaths from "./api.json" with { type: "json" };

const parser = new XMLParser({ ignoreAttributes: false });

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

const createApi = (options = {}) => {
    const client = options && Object.keys(options).length > 0
        ? createTallyClient(options)
        : tallySimple;

    const createFunction = (path) => async (company) => {
        if (typeof company !== "string" || !company.trim()) {
            throw new TypeError("Company name is required.");
        }

        const fn = getByPath({ inObject: client, inPath: path });

        if (typeof fn !== "function") {
            throw new TypeError(`Endpoint not found: ${path}`);
        }

        const xml = await fn(company.trim());

        return parser.parse(xml);
    };

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
