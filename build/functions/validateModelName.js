const undici = require("undici");

async function validateModelName(modelName, base, headers) {
    await undici.fetch(`${base}/models/list`, {
        method: "GET",
        headers: headers
    }).then(response => response.json()).then(data => {
        if (!data.includes(modelName)) {
            throw new TypeError(`Invalid model name: ${modelName}`);
        }
    });
}

module.exports = { validateModelName };