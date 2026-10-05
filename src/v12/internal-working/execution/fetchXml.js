import * as tallySimple from "tally-simple";

const startFunc = async ({ inRoutePath, inCompany }) => {
    const localRoutePath = inRoutePath;
    const localCompany = inCompany;

    const queryFn = localRoutePath
        .split(".")
        .reduce((current, key) => current[key], tallySimple);

    return await queryFn(localCompany);
};

export default startFunc;
