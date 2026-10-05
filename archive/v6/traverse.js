import traverseObject from "./traverseObject/index.js";

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

const traverse = async (
    raka,
    relativePath,
    pathToFind,
    context = {}
) => {
    if (relativePath === pathToFind) {
        if (raka?.action === "fetch") {
            const fn = getByPath({ inObject: context.fetch, inPath: pathToFind });

            if (typeof fn !== "function") {
                throw new TypeError(`Endpoint not found: ${pathToFind}`);
            }

            const xml = await fn(context.company);

            return context.parser.parse(xml);
        }

        return raka;
    }

    if (typeof raka === "object" && raka !== null) {
        return await traverseObject(
            raka,
            relativePath,
            pathToFind,
            context
        );
    }

    return undefined;
};

export { traverse };
export default traverse;
