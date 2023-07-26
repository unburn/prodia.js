const { Prodia } = require("prodia.js");

// Here you can enter your API key
const prodia = new Prodia("API-KEY");

// This is an example of Image to Image
async function imageVariation(imageUrl, prompt) {
    let job = await prodia.createVariants({
        imageUrl: imageUrl,
        prompt: prompt,
        model: "revAnimated_v122.safetensors [3f4fefd9]",
        negative_prompt: "text, blur, duplicate, distorted",
    });

    while (job.status !== "succeeded") {
        await new Promise((resolve) => setTimeout(resolve, 250));
        job = await prodia.getJob(job.job);
    }

    return job;
}

// Enter your prompt & image link here
async function generateVariations() {
    try {
        const job = await imageVariation("https://images.prodia.xyz/c86a20ff-22b9-49af-b581-850878e876c8.png", "A boat on the ocean");
        console.log(job);
    } catch (error) {
        console.error("Error:", error);
    }
}

generateVariations();
