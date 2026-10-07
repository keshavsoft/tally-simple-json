import buildXml from "./buildXml/buildXml.js";
import transport from "./transport.js";
import parseXml from "./parseXml.js";

const startFunc = async ({ inEndpoint, inParam }) => {
    const localEndpoint = inEndpoint;
    const localParam = inParam;

    const xml = buildXml({
        inEndpoint: localEndpoint,
        inParam: localParam
    });

    const rawResponse = await transport({
        inXml: xml
    });

    const jsonToReturn = parseXml({ inXml: rawResponse });

    return jsonToReturn;
};

export default startFunc;
