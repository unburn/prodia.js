const undici = require("undici");
const { validateModelName } = require("../functions/validateModelName");
const { handleResponseError } = require("../functions/handleResponseError");

class Prodia {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.base = "https://api.prodia.com/v1";
        this.headers = {
            accept: "application/json",
            "content-type": "application/json",
            "X-Prodia-Key": this.apiKey
        }
    }

    async generateImage(params) {
        await validateModelName(params.model, this.base, this.headers);

        const body = {
            model: params.model,
            prompt: params.prompt,
            negative_prompt: params.negativePrompt,
            steps: params.steps,
            cfg_scale: params.cfgScale,
            seed: params.seed,
            upscale: params.upscale,
            sampler: params.sampler,
            aspect_ratio: params.aspectRatio,
        }

        const options = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        }

        const response = await undici.fetch(`${this.base}/sd/generate`, options);

        if (response.status === 200) {
            return await response.json();
        } else {
            return handleResponseError(response);
        }
    }

    async transformImage(params) {
        await validateModelName(params.model, this.base, this.headers);

        const body = {
            imageUrl: params.imageUrl,
            model: params.model,
            prompt: params.prompt,
            denoising_strength: params.denoisingStrength,
            negative_prompt: params.negativePrompt,
            steps: params.steps,
            cfg_scale: params.cfgScale,
            seed: params.seed,
            upscale: params.upscale,
            sampler: params.sampler
        }

        const options = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        }

        const response = await undici.fetch(`${this.base}/sd/transform`, options);

        if (response.status === 200) {
            return await response.json();
        } else {
            return handleResponseError(response);
        }
    }

    async controlNet(params) {
        const body = {
            imageUrl: params.imageUrl,
            controlnet_model: params.cnModel,
            controlnet_module: params.cnModule,
            threshold_a: params.thresholdA,
            threshold_b: params.thresholdB,
            resize_mode: params.resizeMode,
            prompt: params.prompt,
            negative_prompt: params.negativePrompt,
            steps: params.steps,
            cfg_scale: params.cfgScale,
            steps: params.steps,
            sampler: params.sampler,
            height: params.height,
            width: params.width
        }

        const options = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        }

        const response = await undici.fetch(`${this.base}/sd/controlnet`, options);

        if (response.status === 200) {
            return await response.json();
        } else {
            return handleResponseError(response);
        }
    }

    async sdxl(params) {
        const body = {
            model: params.model,
            prompt: params.prompt,
            negative_prompt: params.negativePrompt,
            steps: params.steps,
            cfg_scale: params.cfgScale,
            seed: params.seed,
            sampler: params.sampler,
        }

        const options = {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        }

        const response = await undici.fetch(`${this.base}/sdxl/generate`, options);

        if (response.status === 200) {
            return await response.json();
        } else {
            return handleResponseError(response);
        }
    }

    async getJob(jobId) {
        const options = {
            method: "GET",
            headers: this.headers
        }

        const response = await undici.fetch(`${this.base}/job/${jobId}`, options);

        if (response.status === 200) {
            return await response.json();
        } else {
            return handleResponseError(response);
        }
    }

    async getModels() {
        const options = {
            method: "GET",
            headers: this.headers
        }

        const response = await undici.fetch(`${this.base}/models/list`, options);

        if (response.status === 200) {
            return await response.json();
        } else {
            return handleResponseError(response);
        }
    }
}

module.exports = { Prodia };