const getByPath = (object, path) => {
    const direct = path
        .split(".")
        .reduce((current, key) => current?.[key], object);

    if (typeof direct === "function") {
        return direct;
    }

    const withoutRoot = path.startsWith("tally.") ? path.slice("tally.".length) : path;

    return withoutRoot
        .split(".")
        .reduce((current, key) => current?.[key], object);
};

const traverse = async (
    raka,
    relativePath,
    pathToFind,
    context = {}
) => {
    const fn = getByPath(context.fetch, pathToFind);

    if (typeof fn !== "function") {
        throw new TypeError(`Endpoint not found: ${pathToFind}`);
    }

    const xml = await fn(context.company);

    const parser = new context.XMLParser({
        ignoreAttributes: false
    });

    const data = parser.parse(xml);

    return data;
};

export { traverse };
export default traverse;
