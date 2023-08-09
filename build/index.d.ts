declare module 'prodia.js' {
    type aspectRatio = "square" | "portrait" | "landscape";
    type sampler = "Euler" | "Euler a" | "Heun" | "DPM++ 2M Karras" | "DDIM";

    interface Job {
        job: string;
        params: {
            prompt: string;
            cfg_scale: number;
            steps?: number;
            negative_prompt?: string;
            seed?: number;
            upscale?: boolean;
            sampler: string;
            width: number;
            height: number;
            options: {
                sd_model_checkpoint: string;
            }
        }
        status: "succeeded" | "failed";
        imageUrl?: string;
    }

    interface Options {
        model: string;
        prompt: string;
        numofimg?: number;
        negative_prompt?: string;
        seed?: number;
        steps?: number;
        cfg_scale?: number;
        aspect_ratio?: aspectRatio;
        sampler: sampler;
        upscale?: boolean;
    }

    interface TransformOptions {
        imageUrl: string;
        model: string;
        prompt: string;
        numofimg?: number;
        denoising_strength?: number;
        negative_prompt?: string;
        steps?: number;
        cfg_scale?: number;
        seed?: number;
        upscale?: boolean;
        sampler: sampler;
    }

    export class Prodia {
        constructor(apiKey: string);
        key(apiKey: string): void;
        createJob(options: Options): Promise<Job>;
        transform(options: TransformOptions): Promise<Job>;
        getModels(): Promise<string[]>;
        getJob(jobId: string): Promise<Job>;
    }
}