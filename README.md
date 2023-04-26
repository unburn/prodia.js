# Prodia AI Image API

This is a Node.js library for accessing the [Prodia API](https://docs.prodia.com/reference/getting-started). It allows you to easily create AI images.

Unleash your creativity with lightning-fast performance and transform your ideas into stunning visuals in seconds.

## Installation

Install the library using npm:

```
npm i prodia-ai
```

Make sure you're using node >= 18 so fetch is available.

## Usage

First, you need to import the library and set your API key:

```js
const prodia = require("prodia-ai");

prodia.key("----------"); // Get your API key at https://app.prodia.com/
```

## Creating a Job
```js
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
```

## List of Models
https://docs.prodia.com/reference/generate

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
- `sampler` - The sampler to use for generation.
- `aspect_ratio` - The aspect ratio to use for generation. Defaults to "square".

Returns a Promise that resolves to an object representing the created job.

## Error Handling
If an error occurs during API requests, the library will output a message to the console in red text and exit the process.

- If the API key is not set, the error message will be "The Prodia API Key is not set. Go to https://app.prodia.com/api and get an API key."
- If the generation parameters are invalid, the error message will be "Invalid Generation Parameters: ${statusCode}".

## Support Server

Issue with API, Join official [Prodia server](https://discord.gg/495hz6vrFN)

Join my support server for package issues & code help (also have fun)

[<img src="https://discordapp.com/api/guilds/789443193989103648/widget.png?style=banner2" alt="Discord Banner 1"/>](https://discord.gg/TvjrWtEuyP)