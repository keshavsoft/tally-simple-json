import tallySimple from "tally-simple";
import { XMLParser } from "fast-xml-parser";

import source from "../source.json" with { type: "json" };
import traverse from "../traverse.js";
import apiPaths from "./api.json" with { type: "json" };

const parser = new XMLParser({ ignoreAttributes: false });

const createApi = () => {
    const createFunction = (path) => async (company) => {
        if (typeof company !== "string" || !company.trim()) {
            throw new TypeError("Company name is required.");
        }

        return await traverse(source, "", path, {
            company: company.trim(),
            fetch: tallySimple,
            parser
        });
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
