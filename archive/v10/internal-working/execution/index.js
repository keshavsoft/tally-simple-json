import fetchXml from "./fetchXml.js";
import parseXml from "./parseXml.js";

const startFunc = async ({ inRoutePath, inCompany }) => {
    const localRoutePath = inRoutePath;
    const localCompany = inCompany;

    const xmlResponse = await fetchXml({
        inRoutePath: localRoutePath,
        inCompany: localCompany
    });

    return parseXml({
        inXml: xmlResponse
    });
};

export default startFunc;
