import validateInput from "./validateInput.js";
import fetchXml from "./fetchXml.js";
import parseXml from "./parseXml.js";

const startFunc = async ({ inRoutePath, inParam }) => {
    const localRoutePath = inRoutePath;
    const localParam = inParam;

    const company = validateInput({
        inParam: localParam
    });

    const xmlResponse = await fetchXml({
        inRoutePath: localRoutePath,
        inCompany: company
    });

    return parseXml({
        inXml: xmlResponse
    });
};

export default startFunc;
