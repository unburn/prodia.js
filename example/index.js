(async () => {
    const { Prodia } = require("../build/index");

    const prodia = new Prodia("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    const generate = await prodia.sdxl({
        prompt: "breathtaking night street of Tokyo, neon lights. award-winning, professional, highly detailed",
        model: "dreamshaperXL10_alpha2.safetensors [c8afe2ef]"
    })

    while (generate.status !== "succeeded" && generate.status !== "failed") {
        new Promise((resolve) => setTimeout(resolve, 250));

        const job = await prodia.getJob(generate.job);

        if (job.status === "succeeded") {
            console.log(job);
            break;
        }
    }
})()