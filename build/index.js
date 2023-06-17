const fetch = require('node-fetch');

class Prodia {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.base = "https://api.prodia.com/v1";
    }

    headers() {
        if (!this.apiKey) {
            console.error("\x1b[31m[Error]\x1b[0m You must set your API key before using this library. See https://app.prodia.com/api for more information.");
        }

        return {
            "X-Prodia-Key": this.apiKey,
            "Content-Type": "application/json",
            "Accept": "application/json"
        };
    }

    async createJob(params) {
        const response = await fetch(`${this.base}/job`, {
            method: "POST",
            headers: this.headers(),
            body: JSON.stringify(params),
        });

        if (response.status === 401) {
            console.error(`\x1b[31m[Error]\x1b[0m Your API key is incorrect. See https://app.prodia.com/api for more information.`);
        }

        if (response.status === 402) {
            console.error(`\x1b[31m[Error]\x1b[0m API Access Not Enabled. See https://app.prodia.com/api for more information.`);
        }

        if (response.status === 400) {
            console.error(`\x1b[31m[Error]\x1b[0m Invalid Generation Parameters: ${response.status}`);
        }

        let job = await response.json();

        while (job.status !== "succeeded" && job.status !== "failed") {
            await new Promise((resolve) => setTimeout(resolve, 250));

            const jobResponse = await fetch(`${this.base}/job/${job.job}`, {
                headers: this.headers(),
            });

            if (jobResponse.status === 401) {
                console.error(`\x1b[31m[Error]\x1b[0m Your API key is incorrect. See https://app.prodia.com/api for more information.`);
            }

            if (jobResponse.status === 402) {
                console.error(`\x1b[31m[Error]\x1b[0m API Access Not Enabled. See https://app.prodia.com/api for more information.`);
            }

            if (jobResponse.status === 400) {
                console.error(`\x1b[31m[Error]\x1b[0m Invalid Generation Parameters: ${jobResponse.status}`);
            }

            job = await jobResponse.json();
        }

        if (job.status !== "succeeded") {
            throw new Error("\x1b[31m[Error]\x1b[0m Job failed to generate image.");
        }

        return job;
    }

    async getJob(jobId) {
        const response = await fetch(`${this.base}/job/${jobId}`, {
            headers: this.headers(),
        });

        if (response.status === 401) {
            console.error(`\x1b[31m[Error]\x1b[0m Your API key is incorrect. See https://prodia.com/docs/api for more information.`);
        }

        if (response.status === 402) {
            console.error(`\x1b[31m[Error]\x1b[0m API Access Not Enabled. See https://prodia.com/docs/api for more information.`);
        }

        if (response.status === 400) {
            console.error(`\x1b[31m[Error]\x1b[0m Invalid Generation Parameters: ${response.status}`);
        }

        return response.json();
    }

    async createVariants(params) {
        const options = {
            method: 'POST',
            headers: this.headers(),
            body: JSON.stringify(params),
        };

        const response = await fetch(`https://api.prodia.com/v1/transform`, options);

        if (response.status === 401) {
            console.error(`\x1b[31m[Error]\x1b[0m Your API key is incorrect. See https://app.prodia.com/api for more information.`);
        }

        if (response.status === 402) {
            console.error(`\x1b[31m[Error]\x1b[0m API Access Not Enabled. See https://app.prodia.com/api for more information.`);
        }

        if (response.status === 400) {
            console.error(`\x1b[31m[Error]\x1b[0m Invalid Generation Parameters: ${response.status}`);
        }

        return response.json();
    }
}

module.exports = {
    Prodia,
};
