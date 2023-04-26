(async () => {
    const prodia = require("prodia-ai");

    prodia.key("----------");

    let job = await prodia.createJob({
        model: "v1-5-pruned-emaonly.ckpt [81761151]", // Intellicode will list all models. if you are not using intellicode, you can find all models here: https://docs.prodia.com/reference/generate
        prompt: "a portrait of an old coal miner in 19th century, beautiful painting with highly detailed face by greg rutkowski and magali villanueve",
        negative_prompt: "no text, no blur",
        seed: -1,
        steps: 35,
        cfg_scale: 7,
    });

    console.log("Job Created! Waiting...");

    while (job.status !== "succeeded" && job.status !== "failed") {
        await new Promise((resolve) => setTimeout(resolve, 250));

        job = await prodia.getJob(job.job);
    }

    if (job.status !== "succeeded") {
        throw new Error("Job failed!");
    }

    console.log("Generation completed!", job.imageUrl);
})()