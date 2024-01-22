const request = require("request");
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

    async sendRequest(endpoint, method, body) {
        return new Promise((resolve, reject) => {
            const options = {
                url: `${this.base}${endpoint}`,
                method: method,
                headers: this.headers,
                json: true,
                body: body
            };

            request(options, async (error, response, responseBody) => {
                if (error) {
                    reject(error);
                } else {
                    if (response.statusCode === 200) {
                        resolve(responseBody);
                    } else {
                        reject(await handleResponseError(response))
                    }
                }
            });
        });
    }

    async generateImage(params) {
        const body = {
            model: params.model,
            prompt: params.prompt,
            negative_prompt: params.negative_prompt,
            style_preset: params.style_preset,
            steps: params.steps,
            cfg_scale: params.cfg_scale,
            seed: params.seed,
            upscale: params.upscale,
            sampler: params.sampler,
            aspect_ratio: params.aspect_ratio,
        }

        return this.sendRequest("/sd/generate", "POST", body);
    }

    async transformImage(params) {
        const body = {
            imageUrl: params.imageUrl,
            imageData: params.imageData,
            model: params.model,
            prompt: params.prompt,
            denoising_strength: params.denoising_strength,
            negative_prompt: params.negative_prompt,
            style_preset: params.style_preset,
            steps: params.steps,
            cfg_scale: params.cfg_scale,
            seed: params.seed,
            upscale: params.upscale,
            sampler: params.sampler,
            width: params.width,
            height: params.height
        }

        return this.sendRequest("/sd/transform", "POST", body);
    }

    async inPaint(params) {
        const body = {
            imageUrl: params.imageUrl,
            imageData: params.imageData,
            maskUrl: params.maskUrl,
            maskData: params.maskData,
            model: params.model,
            prompt: params.prompt,
            denoising_strength: params.denoising_strength,
            negative_prompt: params.negative_prompt,
            style_preset: params.style_preset,
            steps: params.steps,
            cfg_scale: params.cfg_scale,
            seed: params.seed,
            upscale: params.upscale,
            mask_blur: params.mask_blur,
            inpainting_fill: params.inpainting_fill,
            inpainting_mask_invert: params.inpainting_mask_invert,
            inpainting_full_res: params.inpainting_full_res,
            sampler: params.sampler
        }

        return this.sendRequest("/sd/inpainting", "POST", body);
    }

    async controlNet(params) {
        const body = {
            imageUrl: params.imageUrl,
            imageData: params.imageData,
            controlnet_model: params.controlnet_model,
            controlnet_module: params.controlnet_module,
            control_mode: params.control_mode,
            threshold_a: params.threshold_a,
            threshold_b: params.threshold_b,
            resize_mode: params.resize_mode,
            prompt: params.prompt,
            negative_prompt: params.negative_prompt,
            style_preset: params.style_preset,
            steps: params.steps,
            cfg_scale: params.cfg_scale,
            seed: params.seed,
            sampler: params.sampler,
            height: params.height,
            width: params.width
        }

        return this.sendRequest("/sd/controlnet", "POST", body);
    }

    async SDXL(params) {
        const body = {
            model: params.model,
            prompt: params.prompt,
            negative_prompt: params.negative_prompt,
            style_preset: params.style_preset,
            steps: params.steps,
            cfg_scale: params.cfg_scale,
            seed: params.seed,
            sampler: params.sampler,
            width: params.width,
            height: params.height
        }

        return this.sendRequest("/sdxl/generate", "POST", body);
    }

    async transformSDXLImage(params) {
        const body = {
            imageUrl: params.imageUrl,
            imageData: params.imageData,
            model: params.model,
            prompt: params.prompt,
            denoising_strength: params.denoising_strength,
            negative_prompt: params.negative_prompt,
            style_preset: params.style_preset,
            steps: params.steps,
            cfg_scale: params.cfg_scale,
            seed: params.seed,
            upscale: params.upscale,
            sampler: params.sampler,
            width: params.width,
            height: params.height
        }

        return this.sendRequest("/sdxl/transform", "POST", body);
    }

    async inPaintSDXL(params) {
        const body = {
            imageUrl: params.imageUrl,
            imageData: params.imageData,
            maskUrl: params.maskUrl,
            maskData: params.maskData,
            model: params.model,
            prompt: params.prompt,
            denoising_strength: params.denoising_strength,
            negative_prompt: params.negative_prompt,
            style_preset: params.style_preset,
            steps: params.steps,
            cfg_scale: params.cfg_scale,
            seed: params.seed,
            upscale: params.upscale,
            mask_blur: params.mask_blur,
            inpainting_fill: params.inpainting_fill,
            inpainting_mask_invert: params.inpainting_mask_invert,
            inpainting_full_res: params.inpainting_full_res,
            sampler: params.sampler,
            width: params.width,
            height: params.height
        }

        return this.sendRequest("/sdxl/inpainting", "POST", body);
    }

    async faceSwap(params) {
        const body = {
            sourceUrl: params.sourceUrl,
            targetUrl: params.targetUrl
        }

        return this.sendRequest("/faceswap", "POST", body);
    }

    async faceRestore(params) {
        const body = {
            imageUrl: params.imageUrl,
            imageData: params.imageData
        }

        return this.sendRequest("/facerestore", "POST", body);
    }

    async upscale(params) {
        const body = {
            imageUrl: params.imageUrl,
            imageData: params.imageData,
            resize: params.resize
        }

        return this.sendRequest("/upscale", "POST", body)
    }

    async getJob(jobId) {
        return this.sendRequest(`/job/${jobId}`, "GET");
    }

    async getSDmodels() {
        return this.sendRequest("/sd/models", "GET");
    }

    async getSDXLmodels() {
        return this.sendRequest("/sdxl/models", "GET")
    }

    async getSDsamplers() {
        return this.sendRequest("/sd/samplers", "GET")
    }

    async getSDXLsamplers() {
        return this.sendRequest("/sdxl/samplers", "GET")
    }

    async getSDloras() {
        return this.sendRequest("/sd/loras", "GET")
    }

    async getSDXLloras() {
        return this.sendRequest("/sdxl/loras", "GET")
    }

    async getSDembeddings() {
        return this.sendRequest("/sd/embeddings", "GET")
    }

    async getSDXLembeddings() {
        return this.sendRequest("/sdxl/embeddings", "GET")
    }
}

module.exports = { Prodia };