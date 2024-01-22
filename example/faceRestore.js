const { Prodia } = require("prodia.js");
const prodia = new Prodia("x-x-x-x-x"); // API KEY HERE

(async () => {
    const generate = await prodia.faceRestore({
        imageUrl: "https://images.prodia.xyz/73f3b014-8bb6-4c81-821c-379734790ffe.png"
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