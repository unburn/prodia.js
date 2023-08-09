class Prodia {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.base = "https://api.prodia.com/v1";

        if (!this.apiKey) {
            throw new Error("You must set your API key before using this library. See https://prodia.js.org for more information.");
        }

        this.headers = {
            "X-Prodia-Key": this.apiKey,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    async validateModelName(modelName) {
        fetch(`${this.base}/models/list`, {
            method: "GET",
            headers: this.headers
        }).then(response => response.json()).then(data => {
            if (!data.includes(modelName)) {
                throw new TypeError(`Invalid model name: ${modelName}`);
            }
        });
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

        throw new Error(errorMessage);
    }

    async createJob(params = {}) {
        this.validateModelName(params.model);

        const NumOfImg = params.numofimg || 1;

        if (NumOfImg > 4) {
            throw new Error("You can only generate a maximum of 4 images at a time.");
        }

        const generatedImages = [];

        for (let i = 0; i < NumOfImg; i++) {
            const response = await fetch(`${this.base}/job`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                await this.handleResponseError(response);
            }

            let job = await response.json();

            while (job.status !== "succeeded" && job.status !== "failed") {
                await new Promise((resolve) => setTimeout(resolve, 250));

                const jobResponse = await fetch(`${this.base}/job/${job.job}`, {
                    headers: this.headers,
                });

                if (!jobResponse.ok) {
                    await this.handleResponseError(jobResponse);
                }

                job = await jobResponse.json();
            }

            if (job.status === "succeeded") {
                generatedImages.push(job.imageUrl);
            } else {
                console.error(`Job ${i + 1} failed to generate image: ${job.status}`);
            }
        }

        return generatedImages;
    }

    async getJob(jobId) {
        if (!jobId) {
            throw new Error("You must provide a job ID.");
        }

        const response = await fetch(`${this.base}/job/${jobId}`, {
            headers: this.headers
        });

        if (!response.ok) {
            await this.handleResponseError(response);
        }

        const job = await response.json();

        return job;
    }

    async getModels() {
        const response = await fetch(`${this.base}/models/list`, {
            headers: this.headers
        });

        if (!response.ok) {
            await this.handleResponseError(response);
        }

        const models = await response.json();

        return models;
    }

    async transform(params = {}) {
        this.validateModelName(params.model);

        const options = {
            method: 'POST',
            headers: this.headers(),
            body: JSON.stringify(params),
        };

        const NumOfImg = params.numofimg || 1;

        if (NumOfImg > 4) {
            throw new Error("You can only generate a maximum of 4 images at a time.");
        }

        const generatedImages = [];

        for (let i = 0; i < params.numofimg; i++) {
            const response = await fetch(`${this.base}/transform`, options);

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

            if (job.status === "succeeded") {
                generatedImages.push(job.imageUrl);
            } else {
                throw new Error(`Job ${i + 1} failed to generate image: ${job.status}`);
            }
        }

        return generatedImages;
    }
}

module.exports = { Prodia };