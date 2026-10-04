import { createApi } from "./v2/index.js";

const createTallyClient = (options = {}) => createApi(options);

const tally = createTallyClient();

export { createTallyClient, tally };
export default tally;
