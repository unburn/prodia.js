const fetch = require('node-fetch');

let apiKey;

//Base URL for API
const base = "https://api.prodia.com/v1";

const headers = () => {
    //No API Key Set
    if (!apiKey) {
        console.error("\x1b[31m[Error]\x1b[0m You must set your API key before using this library. See https://app.prodia.com/api for more information.");
        process.exit();
    }

    return {
        "X-Prodia-Key": apiKey,
        "Content-Type": "application/json",
    };
};

const models = {
    "sdv1_4.ckpt [7460a6fa]": true,
    "anythingv3_0-pruned.ckpt [2700c435]": true,
    "anything-v4.5-pruned.ckpt [65745d25]": true,
    "analog-diffusion-1.0.ckpt [9ca13f02]": true,
    "theallys-mix-ii-churned.safetensors [5d9225a4]": true,
    "elldreths-vivid-mix.safetensors [342d9d26]": true
}

const ratio = {
    "square": true,
    "landscape": true,
    "portrait": true
}

const samplers = {
    "Euler": true,
    "Euler a": true,
    "Heun": true,
    "DPM++ 2M Karras": true
}

const upscales = {
    true: true,
    false: true
}

const createJob = async ({ model, prompt, negative_prompt, seed, steps, cfg_scale, aspect_ratio, sampler, upscale }) => {
    if (!models[model]) {
        console.error(`[Error] Invalid model: ${model}`);
        return;
    }

    if (!ratio[aspect_ratio]) {
        console.error(`[Error] Invalid aspect ratio: ${aspect_ratio}`);
        return;
    }

    if (!samplers[sampler]) {
        console.error(`[Error] Invalid sampler: ${sampler}`);
        return;
    }

    if (!upscales[upscale]) {
        console.error(`[Error] Invalid upscale: ${upscale}`);
        return;
    }

    const response = await fetch(`${base}/job`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
            model: model,
            prompt: prompt,
            negative_prompt: negative_prompt || "",
            seed: seed || -1,
            steps: steps || 10,
            cfg_scale: cfg_scale || 7,
            aspect_ratio: aspect_ratio || "square",
            sampler: sampler || "",
            upscale: upscale || false
        }),
    });

    //Invalid API Key (401)
    if (response.status === 401) {
        console.error(`\x1b[31m[Error]\x1b[0m Your API key is incorrect. See https://app.prodia.com/api for more information.`);
        process.exit();
    }

    //API Access Not Enabled (402)
    if (response.status === 402) {
        console.error(`\x1b[31m[Error]\x1b[0m API Access Not Enabled. See https://app.prodia.com/api for more information.`);
        process.exit();
    }

    //Invalid Generation Parameters (400)
    if (response.status === 400) {
        console.error(`\x1b[31m[Error]\x1b[0m Invalid Generation Parameters: ${response.status}`);
        process.exit();
    }

    return response.json();
};

const getJob = async (jobId) => {
    const response = await fetch(`${base}/job/${jobId}`, {
        headers: headers(),
    });

    //Invalid API Key (401)
    if (response.status === 401) {
        console.error(`\x1b[31m[Error]\x1b[0m Your API key is incorrect. See https://prodia.com/docs/api for more information.`);
        process.exit();
    }

    //API Access Not Enabled (402)
    if (response.status === 402) {
        console.error(`\x1b[31m[Error]\x1b[0m API Access Not Enabled. See https://prodia.com/docs/api for more information.`);
        process.exit();
    }

    //Invalid Generation Parameters (400)
    if (response.status === 400) {
        console.error(`\x1b[31m[Error]\x1b[0m Invalid Generation Parameters: ${response.status}`);
        process.exit();
    }

    //Returns the in JSON format
    return response.json();
};

module.exports = {
    key: (key) => apiKey = key,
    createJob: createJob,
    getJob: getJob,
};