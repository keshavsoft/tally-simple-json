import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

const getByPath = (object, pathString) => pathString.split(".").reduce(
    (current, key) => current?.[key],
    object
);

const loadVersionDefinition = (version) => {
    const apiModuleFile = path.join(version.directory, "external-api", "api.js");
    const localApiFile = path.join(version.directory, "external-api", "api.json");
    const versionIndexFile = path.join(version.directory, "index.js");
    const localSourceFile = path.join(version.directory, "source.json");

    let apiFile = localApiFile;
    let sourceFile = localSourceFile;
    let apiReference = `src/${version.name}/external-api/api.json`;
    let sourceReference = `src/${version.name}/source.json`;

    const hasLocalDefinition = [
        apiModuleFile,
        localApiFile,
        localSourceFile
    ].every((file) => fs.existsSync(file));

    if (!hasLocalDefinition) {
        try {
            apiFile = require.resolve("tally-spec/api.json");
            sourceFile = require.resolve("tally-spec/source.json");
            apiReference = "tally-spec/api.json";
            sourceReference = "tally-spec/source.json";
        } catch {
            throw new Error(
                `Active version ${version.name} is missing its local definition files and tally-spec is not available.`
            );
        }
    }

    for (const requiredFile of [versionIndexFile, apiFile, sourceFile]) {
        if (!fs.existsSync(requiredFile)) {
            throw new Error(`Active version ${version.name} is missing ${requiredFile}`);
        }
    }

    const apiPaths = readJson(apiFile);
    const source = readJson(sourceFile);

    if (!Array.isArray(apiPaths) || apiPaths.length === 0) {
        throw new Error(`The API definition must contain at least one path: ${apiFile}`);
    }

    const tree = {};

    for (const apiPath of apiPaths) {
        if (typeof apiPath !== "string" || !apiPath.trim()) {
            throw new Error("Every API path must be a non-empty string.");
        }

        const endpoint = getByPath(source, apiPath);

        if (endpoint === undefined) {
            throw new Error(`API path does not exist in ${sourceFile}: ${apiPath}`);
        }

        const parts = apiPath.split(".");
        let current = tree;

        parts.forEach((part, index) => {
            current[part] ??= {};

            if (index === parts.length - 1) {
                current[part].__endpoint = true;
                current[part].__action = endpoint.action;
            }

            current = current[part];
        });
    }

    const rootName = Object.keys(tree)[0];

    if (!rootName) {
        throw new Error(`No public API root was found in ${apiFile}`);
    }

    if (rootName !== "tally") {
        throw new Error(`The public API root must be tally, received ${rootName}`);
    }

    return {
        version,
        apiFile,
        sourceFile,
        apiReference,
        sourceReference,
        apiPaths,
        rootName,
        tree
    };
};

export { loadVersionDefinition };
