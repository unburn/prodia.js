const { Prodia } = require("../build/index");

// Here you can enter your API key
const prodia = new Prodia("API-KEY");

// This is an example of Image to Image
async function imageVariation(imageUrl, prompt) {
    let job = prodia.createVariants({
        imageUrl: imageUrl,
        prompt: prompt,
        model: "anythingV5_PrtRE.safetensors [893e49b9]",
        negative_prompt: "text, blur, duplicate, distorted",
    })

    while (job.status !== "succeeded") {
        await new Promise((resolve) => setTimeout(resolve, 250));
        job = await prodia.getJob((await job).job);
    }

    return job;
}

// Enter your prompt & image link here
imageVariation("https://images.prodia.xyz/c86a20ff-22b9-49af-b581-850878e876c8.png", "A boat on the ocean").then((job) => {
    console.log(job);
})