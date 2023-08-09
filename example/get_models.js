const { Prodia } = require("prodia.js");

const apiKey = "apiKey";

async function getModels() {
    const prodia = new Prodia(apiKey);

    try {
        const models = await prodia.getModels();
        return models;
    } catch (error) {
        return console.error(error);
    }
}

getModels().then(models => console.log(models));