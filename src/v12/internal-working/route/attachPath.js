import createLeafHandler from "./createLeafHandler.js";

const startFunc = ({ inTree, inPath, inSource, inExecutor }) => {
    const localTree = inTree;
    const localPath = inPath;
    const localSource = inSource;
    const localExecutor = inExecutor;

    const segments = localPath.split(".");
    let current = localTree;

    for (let index = 0; index < segments.length; index += 1) {
        const segment = segments[index];
        const isLeaf = index === segments.length - 1;

        if (isLeaf) {
            current[segment] = createLeafHandler({
                inPath: localPath,
                inSource: localSource,
                inExecutor: localExecutor
            });
            return;
        }

        if (!current[segment] || typeof current[segment] !== "object") {
            current[segment] = {};
        }

        current = current[segment];
    }
};

export default startFunc;
