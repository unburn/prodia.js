declare module 'prodia.js' {
    type modelName =
        | "analog-diffusion-1.0.ckpt [9ca13f02]"
        | "anythingv3_0-pruned.ckpt [2700c435]"
        | "anything-v4.5-pruned.ckpt [65745d25]"
        | "anythingV5_PrtRE.safetensors [893e49b9]"
        | "AOM3A3_orangemixs.safetensors [9600da17]"
        | "deliberate_v2.safetensors [10ec4b29]"
        | "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]"
        | "dreamlike-diffusion-2.0.safetensors [fdcf65e7]"
        | "dreamshaper_5BakedVae.safetensors [a3fbf318]"
        | "dreamshaper_6BakedVae.safetensors [114c8abb]"
        | "elldreths-vivid-mix.safetensors [342d9d26]"
        | "lyriel_v15.safetensors [65d547c5]"
        | "lyriel_v16.safetensors [68fceea2]"
        | "meinamix_meinaV9.safetensors [2ec66ab0]"
        | "openjourney_V4.ckpt [ca2f377f]"
        | "portrait+1.0.safetensors [1400e684]"
        | "Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b]"
        | "Realistic_Vision_V2.0.safetensors [79587710]"
        | "revAnimated_v122.safetensors [3f4fefd9]"
        | "riffusion-model-v1.ckpt [3aafa6fe]"
        | "sdv1_4.ckpt [7460a6fa]"
        | "v1-5-pruned-emaonly.ckpt [81761151]"
        | "shoninsBeautiful_v10.safetensors [25d8c546]"
        | "theallys-mix-ii-churned.safetensors [5d9225a4]"
        | "timeless-1.0.ckpt [7c4971d4]"

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
        model: modelName;
        prompt: string;
        negative_prompt?: string;
        seed?: number;
        steps?: number;
        cfg_scale?: number;
        aspect_ratio: aspectRatio;
        sampler: sampler;
        upscale?: boolean;
    }

    interface VariantsOptions {
        imageUrl: string;
        model: modelName;
        prompt: string;
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
        createVariants(options: VariantsOptions): Promise<Job>;
        getJob(jobId: string): Promise<Job>;
    }
}
