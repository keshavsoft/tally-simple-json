import traverseObject from "./traverseObject/index.js";

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
    if (relativePath === pathToFind) {
        if (raka?.action === "fetch") {
            console.log("pathToFind : ", pathToFind, context.XMLParser);

            const fn = getByPath(context.fetch, pathToFind);

            const xml = await fn(context.company);

            const parser = new context.XMLParser({
                ignoreAttributes: false
            });

            const data = parser.parse(xml);
            // console.log("data : ", data);
            return data;
        };

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
