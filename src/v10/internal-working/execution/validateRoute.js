const startFunc = ({ inSource, inRoutePath }) => {
    const localSource = inSource;
    const localRoutePath = inRoutePath;

    const endpoint = localRoutePath
        .split(".")
        .reduce((current, key) => current?.[key], localSource);

    const isValid = Boolean(endpoint && endpoint.action === "fetch");

    if (!isValid) {
        throw new Error(`Route not supported in source specification: ${localRoutePath}`);
    }
};

export default startFunc;
