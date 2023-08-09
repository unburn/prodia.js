const { Prodia } = require("prodia.js");

const apiKey = "apiKey";
const prompt = "A beautiful sunset over the ocean.";

async function generateImage() {
    const prodia = new Prodia(apiKey);

    try {
        const job = await prodia.createJob({
            model: "revAnimated_v122.safetensors [3f4fefd9]",
            prompt: prompt,
            negative_prompt: "text, blur, duplicate, distorted",
            numofimg: 4
        });

        return job;
    } catch (error) {
        return console.error(error);
    }
}

generateImage().then(job => console.log(job));