const prodia = require("prodia-ai");

prodia.key("YOUR_API_KEY_HERE"); //Get it key from https://app.prodia.com/

const job = await prodia.createJob({
  model: "sdv1_4.ckpt [7460a6fa]",
  prompt: "puppies in a cloud, 4k",
  negative_prompt: "",
  seed: 100,
  steps: 30,
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
