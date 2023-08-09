<div align="center">
	<br />
	<p>
		<a href="https://prodia.js.org/"><img src="https://media.discordapp.net/attachments/1100807769910693969/1119511469957058590/20230617_113011.png" width="546" alt="discord.js" /></a>
	</p>
	<br />
	<p>
		<a href="https://discord.gg/TvjrWtEuyP"><img src="https://img.shields.io/discord/789443193989103648?color=ffcc00&logo=discord&logoColor=white" alt="Discord server" /></a>
        <a href="https://github.com/A3PIRE/prodia.js"><img src="https://img.shields.io/github/stars/A3PIRE/prodia.js?style=social" alt="GitHub stars"></a>
		<a href="https://badge.fury.io/js/prodia.js"><img src="https://img.shields.io/npm/v/prodia.js.svg" alt="npm version"></a>
		<a href="https://badge.fury.io/js/prodia.js"><img src="https://img.shields.io/npm/dt/prodia.js.svg" alt="npm downloads"></a>
	</p>
    <p>
		<a href="https://prodia.js.org/"><img src="https://media.discordapp.net/attachments/1100807769910693969/1119518507260973126/20230617_121618.png" width="200" alt="discord.js" /></a>
	</p>
</div>

# About
**Prodia.js** is a powerfull image API client for prodia.

- Easy to use
- Generate up to 4 images
- Lightweight

# Installation
```
npm i prodia.js
```

# Usage
### TEXT TO IMAGE
```js
const { Prodia } = require("prodia.js");

const apiKey = "apiKey";
const prompt = "A beautiful sunset over the ocean.";

async function generateImage() {
    const prodia = new Prodia(apiKey);

    try {
        const job = await prodia.createJob({
            model: "revAnimated_v122.safetensors [3f4fefd9]",
            prompt: prompt,
            negative_prompt: "text, blur, duplicate, distorted",
            numofimg: 4
        });

        return job;
    } catch (error) {
        return console.error(error);
    }
}

generateImage().then(job => console.log(job));
```

### IMAGE TO IMAGE

```js
const { Prodia } = require("prodia.js");

const apiKey = "apiKey";
const imageUrl = "https://images.prodia.xyz/c86a20ff-22b9-49af-b581-850878e876c8.png";
const prompt = "A boat on the ocean";

async function generateVariations() {
    const prodia = new Prodia(apiKey);

    try {
        let job = await prodia.transform({
            imageUrl: imageUrl,
            prompt: prompt,
            model: "revAnimated_v122.safetensors [3f4fefd9]",
            negative_prompt: "text, blur, duplicate, distorted",
            numofimg: 4
        });

        while (job.status !== "succeeded") {
            await new Promise((resolve) => setTimeout(resolve, 250));
            job = await prodia.getJob(job.job);
        }

        console.log(job);
    } catch (error) {
        console.error("Error:", error);
    }
}

generateVariations();
```

### GET MODELS

```js
const { Prodia } = require("prodia.js");

const apiKey = "apiKey";

async function getModels() {
    const prodia = new Prodia(apiKey);

    try {
        const models = await prodia.getModels();
        return models;
    } catch (error) {
        return console.error(error);
    }
}

getModels().then(models => console.log(models));
```

# Functions

### Prodia.createJob(options)

|Options|Type|
|:--------|:-------|
|`model`|`string`|
|`prompt`|`string`|
|`numofimg`|`number`|
|`negative_prompt`|`string`|
|`seed`|`number`|
|`steps`|`number`|
|`cfg_scale`|`number`|
|`aspect_ratio`|`string`|
|`sampler`|`string`|
|`upscale`|`boolean`|

### Prodia.transform(options)

|Options|Type|
|:--------|:-------|
|`imageUrl`|`string`|
|`model`|`string`|
|`prompt`|`string`|
|`numofimg`|`number`|
|`denoising_strength`|`number`|
|`negative_prompt`|`string`|
|`steps`|`number`|
|`cfg_scale`|`number`|
|`seed`|`number`|
|`upscale`|`boolean`|
|`sampler`|`string`|

### Prodia.getJob(jobId)

|Options|Type|
|:--------|:-------|
|`jobId`|`string`|

# License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/A3PIRE/prodia.js/blob/main/license) file for details