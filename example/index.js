const { Prodia } = require("../build/index");
const prodia = new Prodia("cfbc771f-3347-4652-89b9-12a0950cbcca");

(async () => {
    const generate = await prodia.upscale({
        imageUrl: "https://s6.imgcdn.dev/ZEQqw.jpg",
        resize: 4
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