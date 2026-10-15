import tallySpec from "tally-spec";

/**
 * Story: Masters Schema Guard
 * 
 * Strictly verifies that the resolved master path exists in tally-spec source.json
 * under the "tally.masters" hierarchy and contains a valid TDL definition.
 * 
 * Strictly adheres to schema definitions (e.g. "units.all", "stockItems.withBatches").
 */
const validatePath = (fullPath) => {
    const endpoint = fullPath.split(".").reduce((acc, key) => acc?.[key], tallySpec.source);

    if (!endpoint?.tdl) {
        throw new Error(`Master path "${fullPath}" does not exist in tally-spec schema.`);
    }

    return endpoint;
};

export default validatePath;
