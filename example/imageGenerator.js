const { Prodia } = require("../build/index");

// Here you can enter your API key
const prodia = new Prodia("API-KEY");

// This is an example of how to use the Prodia API to generate an image.
async function imageGenerator(prompt) {
    const job = await prodia.createJob({
        model: "anythingV5_PrtRE.safetensors [893e49b9]",
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
imageGenerator("A beautiful sunset over the ocean.").then((job) => {
    console.log(job);
})