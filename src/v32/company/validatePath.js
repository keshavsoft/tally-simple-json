import tallySpec from "tally-spec";

/**
 * Story: Company Schema Guard
 * 
 * Verifies that the canonical company fetch endpoint ("tally.company.fetch")
 * exists in tally-spec source.json and contains a valid TDL definition.
 */
const validatePath = () => {
    const endpoint = tallySpec.source?.tally?.company?.fetch;

    if (!endpoint?.tdl) {
        throw new Error(`Endpoint "tally.company.fetch" does not exist in tally-spec schema.`);
    }

    return endpoint;
};

export default validatePath;
