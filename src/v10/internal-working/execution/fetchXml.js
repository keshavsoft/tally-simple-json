import tallySimple from "tally-simple";

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

const startFunc = async ({ inRoutePath, inCompany }) => {
    const localRoutePath = inRoutePath;
    const localCompany = inCompany;

    const queryFn = resolveTallySimpleFunction({
        inClient: tallySimple,
        inRoutePath: localRoutePath
    });

    if (typeof queryFn !== "function") {
        throw new TypeError(`Route not implemented in tally-simple: ${localRoutePath}`);
    }

    return await queryFn(localCompany);
};

export default startFunc;
