![Alt text](https://raw.githubusercontent.com/ryzvision/prodia/main/assets/prodia-banner.jpg "a title")

# Prodia API

This is a Node.js library for accessing the [Prodia API](https://docs.prodia.com/reference/getting-started). It allows you to easily create AI images.
## Installation

Install the library using npm:

```
npm i prodia-ai
```

## Usage

First, you need to import the library and set your API key:

```js
const prodia = require("prodia-ai");

prodia.key("YOUR_API_KEY_HERE");
```

## Creating a Job
```js
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
```

## API
`prodia.key(key)`
Sets the Prodia API key to use for requests.

`prodia.createJob(params)`
Creates a new generation job with the specified parameters.

- `model` - The name of the model to use for generation.
- `prompt` - The prompt to use for generation.
- `negative_prompt` - An optional negative prompt to use for conditional generation.
- `seed` - The random seed to use for generation.
- `steps` - The number of steps to run the model for.
- `cfg_scale` - The scale of the configuration space to use for generation.

Returns a Promise that resolves to an object representing the created job.

## Error Handling
If an error occurs during API requests, the library will output a message to the console in red text and exit the process.

- If the API key is not set, the error message will be "The Prodia API Key is not set. Go to https://app.prodia.com/api and get an API key."
- If the generation parameters are invalid, the error message will be "Invalid Generation Parameters: ${statusCode}".

## Support Server

Issue with API, Join official [Prodia server](https://discord.gg/495hz6vrFN)

Join my support server for package issues & code help (also have fun)

[<img src="https://discordapp.com/api/guilds/789443193989103648/widget.png?style=banner2" alt="Discord Banner 1"/>](https://discord.gg/TvjrWtEuyP)