const fetch = require('node-fetch');

let apiKey;

//Base URL for API
const base = "https://api.prodia.com/v1";

const headers = () => {
    //No API Key Set
    if (!apiKey) {
        console.error("\x1b[31m[Error]\x1b[0m You must set your API key before using this library. See https://app.prodia.com/api for more information.");
        process.exit();
    }

    return {
        "X-Prodia-Key": apiKey,
        "Content-Type": "application/json",
    };
};

const createJob = async (params) => {
    const response = await fetch(`${base}/job`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(params),
    });

    //Invalid API Key (401)
    if (response.status === 401) {
        console.error(`\x1b[31m[Error]\x1b[0m Your API key is incorrect. See https://app.prodia.com/api for more information.`);
        process.exit();
    }

    //API Access Not Enabled (402)
    if (response.status === 402) {
        console.error(`\x1b[31m[Error]\x1b[0m API Access Not Enabled. See https://app.prodia.com/api for more information.`);
        process.exit();
    }

    //Invalid Generation Parameters (400)
    if (response.status === 400) {
        console.error(`\x1b[31m[Error]\x1b[0m Invalid Generation Parameters: ${response.status}`);
        process.exit();
    }

    return response.json();
};

const getJob = async (jobId) => {
    const response = await fetch(`${base}/job/${jobId}`, {
        headers: headers(),
    });

    //Invalid API Key (401)
    if (response.status === 401) {
        console.error(`\x1b[31m[Error]\x1b[0m Your API key is incorrect. See https://prodia.com/docs/api for more information.`);
    }

    //API Access Not Enabled (402)
    if (response.status === 402) {
        console.error(`\x1b[31m[Error]\x1b[0m API Access Not Enabled. See https://prodia.com/docs/api for more information.`);
    }

    //Invalid Generation Parameters (400)
    if (response.status === 400) {
        console.error(`\x1b[31m[Error]\x1b[0m Invalid Generation Parameters: ${response.status}`);
    }

    //Returns the in JSON format
    return response.json();
};

module.exports = {
    key: (key) => apiKey = key,
    createJob: createJob,
    getJob: getJob,
};