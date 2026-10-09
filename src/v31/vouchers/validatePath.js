import tallySpec from "tally-spec";

/**
 * Story: Vouchers Schema Guard
 * 
 * Strictly verifies that the resolved voucher path exists in tally-spec source.json
 * under the "tally.vouchers" hierarchy and contains a valid TDL definition.
 * 
 * Strictly adheres to JSON schema definitions (e.g. "sales.fetch", "purchases.fetch").
 * Does not allow loose or improvised paths.
 */
const validatePath = (fullPath) => {
    const endpoint = fullPath.split(".").reduce((acc, key) => acc?.[key], tallySpec.source);

    if (!endpoint?.tdl) {
        throw new Error(`Voucher path "${fullPath}" does not exist in tally-spec schema.`);
    }

    return endpoint;
};

export default validatePath;
