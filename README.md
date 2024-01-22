# **About**
A simple and up to date wrapper for **prodia** with all features included

# **Installation**
```
npm install prodia.js
```

# **Usage**
## **Text to Image**

```js
const { Prodia } = require("prodia.js");
const prodia = new Prodia("x-x-x-x-x"); // API KEY HERE

(async () => {
    const generate = await prodia.generateImage({
        prompt: "(masterpiece), (extremely intricate:1.3),, (realistic), portrait of a girl, the most beautiful in the world, (medieval armor), metal reflections, upper body, outdoors, intense sunlight, far away castle, professional photograph of a stunning woman detailed, sharp focus, dramatic, award winning, cinematic lighting, octane render, unreal engine, volumetrics dtx, (film grain, bokeh, blurry foreground, blurry background), crest on chest",
        model: "absolutereality_v181.safetensors [3d9d4d2b]",
        negative_prompt: "BadDream, (UnrealisticDream:1.3)",
        sampler: "DPM++ SDE Karras",
        cfg_scale: 9,
        steps: 30,
        aspect_ratio: "portrait"
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
```

### Preview
![SDGEN](https://raw.githubusercontent.com/unburn/prodia.js/main/assets/sdgen.png)

## **Image to Image**

```js
const { Prodia } = require("prodia.js");
const prodia = new Prodia("x-x-x-x-x"); // API KEY HERE

(async () => {
    const generate = await prodia.transformImage({
        imageUrl: "https://images.prodia.xyz/8f80512a-4d53-4e7b-b109-cbc27b49ef19.png",
        prompt: "",
        model: "absolutereality_v181.safetensors [3d9d4d2b]",
        negative_prompt: "BadDream, (UnrealisticDream:1.3)",
        sampler: "DPM++ SDE Karras",
        cfg_scale: 9,
        steps: 30,
        width: 512,
        height: 768
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
```

### Preview
![transform](https://raw.githubusercontent.com/unburn/prodia.js/main/assets/transform.png)

## **Control Net**

```js
const { Prodia } = require("prodia.js");
const prodia = new Prodia("x-x-x-x-x"); // API KEY HERE

(async () => {
    const generate = await prodia.controlNet({
        controlnet_model: "control_v11p_sd15_scribble [d4ba51ff]",
        controlnet_module: "canny",
        imageUrl: "https://i.pinimg.com/originals/f1/8c/e9/f18ce952d2103517ba844de709c8ba92.jpg",
        prompt: "cloudy sky background lush landscape house and trees illustration concept art anime key visual trending pixiv fanbox by wlop and greg rutkowski and makoto shinkai and studio ghibli",
        cfg_scale: 10
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
```

### Preview
![controlnet](https://raw.githubusercontent.com/unburn/prodia.js/main/assets/ctrlnet.png)

## **SDXL**

```js
const { Prodia } = require("prodia.js");
const prodia = new Prodia("x-x-x-x-x"); // API KEY HERE

(async () => {
    const generate = await prodia.SDXL({
        model: "dreamshaperXL10_alpha2.safetensors [c8afe2ef]",
        prompt: "ethereal fantasy concept art of sorceress casting spells. magnificent, celestial, ethereal, painterly, epic, majestic, magical, fantasy art, cover art, dreamy",
        negative_prompt: "photographic, realistic, realism, 35mm film, dslr, cropped, frame, text, deformed, glitch, noise, noisy, off-center, deformed, cross-eyed, closed eyes, bad anatomy, ugly, disfigured, sloppy, duplicate, mutated, black and white",
        sampler: "DPM++ 2M Karras",
        cfg_scale: 9,
        steps: 30
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
```

### Preview
![SDXL](https://raw.githubusercontent.com/unburn/prodia.js/main/assets/sdxl.png)

## **Face Swap**
```js
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
```

### Preview
![FaceSwap](https://raw.githubusercontent.com/unburn/prodia.js/main/assets/faceswap.png)

## Face Restore
```js
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
```
### Preview
![FaceRestore](https://raw.githubusercontent.com/unburn/prodia.js/main/facerestore.png)

## **Upscale**
```js
const { Prodia } = require("prodia.js");
const prodia = new Prodia("x-x-x-x-x"); // API KEY HERE

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
```

# **Help**
If you need help or want some features to be added, join our official **[Discord](https://discord.gg/qDysF95NWh)** community & the official **[Prodia](https://discord.gg/22s88bSe6h)** server.