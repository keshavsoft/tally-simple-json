import apiTree, { createCaller } from "@keshavsoft/api-tree";
import { source, apiPaths } from "tally-spec";

import execute from "./engine/index.js";

const app = apiTree(source, apiPaths, execute);
const call = createCaller({ inSource: source, inExecutor: execute });

export default app;
export { app, call };
