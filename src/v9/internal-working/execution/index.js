import validateRoute from "./validateRoute.js";
import validateCompany from "./validateCompany.js";
import fetchXml from "./fetchXml.js";
import parseXml from "./parseXml.js";

const startFunc = async ({ inRoutePath, inCompany, inSource }) => {
    const localRoutePath = inRoutePath;
    const localCompany = inCompany;
    const localSource = inSource;

    validateRoute({
        inSource: localSource,
        inRoutePath: localRoutePath
    });

    const companyName = validateCompany({
        inCompany: localCompany
    });

    const xmlResponse = await fetchXml({
        inRoutePath: localRoutePath,
        inCompany: companyName
    });

    return parseXml({
        inXml: xmlResponse
    });
};

export default startFunc;
