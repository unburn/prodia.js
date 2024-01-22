const { Prodia } = require("prodia.js");
const prodia = new Prodia("x-x-x-x-x"); // API KEY HERE

(async () => {
    const generate = await prodia.faceSwap({
        sourceUrl: "https://api.time.com/wp-content/uploads/2014/10/4568715041.jpg",
        targetUrl: "https://www.baltana.com/files/wallpapers-14/Captain-America-Wallpapers-Full-HD-37890.jpg",
    });

    while (generate.status !== "succeeded" && generate.status !== "failed") {
        new Promise((resolve) => setTimeout(resolve, 250));

        const job = await prodia.getJob(generate.job);

        if (job.status === "succeeded") {
            console.log(job);
            break;
        }
    }
})()