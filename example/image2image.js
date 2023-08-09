const { Prodia } = require("prodia.js");

const apiKey = "apiKey";
const imageUrl = "https://images.prodia.xyz/c86a20ff-22b9-49af-b581-850878e876c8.png";
const prompt = "A boat on the ocean";

async function generateVariations() {
    const prodia = new Prodia(apiKey);

    try {
        let job = await prodia.transform({
            imageUrl: imageUrl,
            prompt: prompt,
            model: "revAnimated_v122.safetensors [3f4fefd9]",
            negative_prompt: "text, blur, duplicate, distorted",
            numofimg: 4
        });

        while (job.status !== "succeeded") {
            await new Promise((resolve) => setTimeout(resolve, 250));
            job = await prodia.getJob(job.job);
        }

        console.log(job);
    } catch (error) {
        console.error("Error:", error);
    }
}

generateVariations();