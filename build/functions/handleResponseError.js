async function handleResponseError(response) {
    const statusCode = response.statusCode;

    switch (statusCode) {
        case 401:
            return new Error("API Access Not Enabled");
        case 402:
            return new Error("API Access Not Enabled");
        case 400:
            return new Error("Invalid Generation Parameters");
        default:
            return new Error(`An error occurred with status code: ${statusCode}`);
    }
}

module.exports = { handleResponseError };