import { call } from "tally-xml-tdl";
import parseXml from "./parseXml.js";

const validateCompany = (value) => {
    if (typeof value !== "string" || value.trim() === "") {
        throw new TypeError("Company name is required and must be a non-empty string.");
    }

    return value.trim();
};

const startFunc = async ({ inRoutePath, inParam, inSource }) => {
    const localRoutePath = inRoutePath;
    const localParam = validateCompany(inParam);
    const localSource = inSource;

    const rawResponse = await call(localRoutePath,
        localParam);

    const jsonResponse = parseXml({ inXml: rawResponse });

    return jsonResponse;
};

export default startFunc;
