async function handleResponseError(response) {
    const statusCode = response.status;

    switch (statusCode) {
        case 401:
            return new Error("Invalid API Key. See https://app.prodia.com/api for more information.");
        case 402:
            return new Error("API Key has been disabled. See https://app.prodia.com/api for more information.");
        case 400:
            return new Error("Invalid Request. See https://app.prodia.com/api for more information.");
        default:
            return new Error(`An error occurred with status code: ${statusCode}`);
    }
}

module.exports = { handleResponseError };
