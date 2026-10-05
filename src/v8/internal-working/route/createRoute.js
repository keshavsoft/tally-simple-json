/**
 * Route Engine:
 *  Assembles the nested callable object tree from the public allowlist (api.json).
 *  When invoked by a consumer, captures the invoked route path and delegates to the executor.
 */
const createRoute = ({ inApiPaths, inSource, inExecutor }) => {
    const localApiPaths = inApiPaths;
    const localSource = inSource;
    const localExecutor = inExecutor;

    const root = {};

    for (const path of localApiPaths) {
        const parts = path.split(".");
        let current = root;

        parts.forEach((part, index) => {
            const isLast = index === parts.length - 1;

            if (isLast) {
                // When invoked, capture the route path and forward to the executor
                current[part] = async (inCompany) => {
                    return await localExecutor({
                        inRoutePath: path,
                        inCompany: inCompany,
                        inSource: localSource
                    });
                };
                return;
            }

            current[part] ??= {};
            current = current[part];
        });
    }

    const rootName = localApiPaths[0]?.split(".")[0];

    return rootName ? root[rootName] : root;
};

export default createRoute;
