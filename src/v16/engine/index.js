import { call } from "tally-xml-tdl";
import parseXml from "./parseXml.js";

const startFunc = async ({ inRoutePath, inParam, inSource }) => {
    const localRoutePath = inRoutePath;
    const localParam = inParam;
    const localSource = inSource;

    const rawResponse = await call(localRoutePath,
        localParam);

    const jsonResponse = parseXml({ inXml: rawResponse });

    return await jsonResponse;
};

export default startFunc;
