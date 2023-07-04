const fetch = require('node-fetch');

class Prodia {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.base = "https://api.prodia.com/v1";
    }

    headers() {
        if (!this.apiKey) {
            throw new Error("[Error] You must set your API key before using this library. See https://app.prodia.com/api for more information.");
        }

        return {
            "X-Prodia-Key": this.apiKey,
            "Content-Type": "application/json",
            "Accept": "application/json"
        };
    }

    validateModelName(modelName) {
        // Define the list of valid model names
        const validModelNames = [
            "analog-diffusion-1.0.ckpt [9ca13f02]",
            "anythingv3_0-pruned.ckpt [2700c435]",
            "anything-v4.5-pruned.ckpt [65745d25]",
            "AOM3A3_orangemixs.safetensors [9600da17]",
            "deliberate_v2.safetensors [10ec4b29]",
            "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]",
            "dreamlike-diffusion-2.0.safetensors [fdcf65e7]",
            "dreamshaper_5BakedVae.safetensors [a3fbf318]",
            "dreamshaper_6BakedVae.safetensors [114c8abb]",
            "elldreths-vivid-mix.safetensors [342d9d26]",
            "lyriel_v15.safetensors [65d547c5]",
            "lyriel_v16.safetensors [68fceea2]",
            "meinamix_meinaV9.safetensors [2ec66ab0]",
            "openjourney_V4.ckpt [ca2f377f]",
            "portrait+1.0.safetensors [1400e684]",
            "Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b]",
            "Realistic_Vision_V2.0.safetensors [79587710]",
            "revAnimated_v122.safetensors [3f4fefd9]",
            "riffusion-model-v1.ckpt [3aafa6fe]",
            "sdv1_4.ckpt [7460a6fa]",
            "v1-5-pruned-emaonly.ckpt [81761151]",
            "shoninsBeautiful_v10.safetensors [25d8c546]",
            "theallys-mix-ii-churned.safetensors [5d9225a4]",
            "timeless-1.0.ckpt [7c4971d4]"
        ];

        if (!validModelNames.includes(modelName)) {
            throw new Error(`[Error] Invalid model name: ${modelName}`);
        }
    }

    async handleResponseError(response) {
        const statusCode = response.status;
        let errorMessage = "";

        switch (statusCode) {
            case 401:
                errorMessage = "Your API key is incorrect. See https://app.prodia.com/api for more information.";
                break;
            case 402:
                errorMessage = "API Access Not Enabled. See https://app.prodia.com/api for more information.";
                break;
            case 400:
                errorMessage = `Invalid Generation Parameters: ${statusCode}`;
                break;
            default:
                errorMessage = `An error occurred with status code: ${statusCode}`;
        }

        throw new Error(`[Error] ${errorMessage}`);
    }

    async createJob(params) {
        const { model } = params;
        this.validateModelName(model);

        const response = await fetch(`${this.base}/job`, {
            method: "POST",
            headers: this.headers(),
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            await this.handleResponseError(response);
        }

        let job = await response.json();

        while (job.status !== "succeeded" && job.status !== "failed") {
            await new Promise((resolve) => setTimeout(resolve, 250));

            const jobResponse = await fetch(`${this.base}/job/${job.job}`, {
                headers: this.headers(),
            });

            if (!jobResponse.ok) {
                await this.handleResponseError(jobResponse);
            }

            job = await jobResponse.json();
        }

        if (job.status !== "succeeded") {
            throw new Error("[Error] Job failed to generate image.");
        }

        return job;
    }

    async getJob(jobId) {
        const response = await fetch(`${this.base}/job/${jobId}`, {
            headers: this.headers(),
        });

        if (!response.ok) {
            await this.handleResponseError(response);
        }

        return response.json();
    }

    async createVariants(params) {
        const { model } = params;
        this.validateModelName(model);

        const options = {
            method: 'POST',
            headers: this.headers(),
            body: JSON.stringify(params),
        };

        const response = await fetch(`${this.base}/transform`, options);

        if (!response.ok) {
            await this.handleResponseError(response);
        }

        return response.json();
    }
}

module.exports = {
    Prodia,
};
