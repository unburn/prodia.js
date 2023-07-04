const { Prodia } = require("prodia.js");

// Here you can enter your API key
const prodia = new Prodia("API-KEY");

// This is an example of how to use the Prodia API to generate an image.
async function imageGenerator(prompt) {
    const job = await prodia.createJob({
        model: "revAnimated_v122.safetensors [3f4fefd9]",
        prompt: prompt,
        negative_prompt: "text, blur, duplicate, distorted",
    });

    while (job.status !== "succeeded") {
        await new Promise((resolve) => setTimeout(resolve, 250));
        job = await prodia.getJob(job.job);
    }

    return job;
}

// Enter your prompt here
async function generateImage() {
    try {
        const job = await imageGenerator("A beautiful sunset over the ocean.");
        console.log(job);
    } catch (error) {
        console.error("Error:", error);
    }
}

generateImage();