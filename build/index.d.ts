declare module 'prodia-ai' {
    type modelName =
        | "sdv1_4.ckpt [7460a6fa]"
        | "v1-5-pruned-emaonly.ckpt [81761151]"
        | "anythingv3_0-pruned.ckpt [2700c435"
        | "anything-v4.5-pruned.ckpt [65745d25]"
        | "analog-diffusion-1.0.ckpt [9ca13f02]"
        | "theallys-mix-ii-churned.safetensors [5d9225a4]"
        | "elldreths-vivid-mix.safetensors [342d9d26]"
        | "deliberate_v2.safetensors [10ec4b29]"
        | "openjourney_V4.ckpt [ca2f377f]"
        | "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]"
        | "dreamlike-diffusion-2.0.safetensors [fdcf65e7]"
        | "portrait+1.0.safetensors [1400e684]"
        | "riffusion-model-v1.ckpt [3aafa6fe]"
        | "timeless-1.0.ckpt [7c4971d4]";

    type aspectRatio = "square" | "portrait" | "landscape";
    type sampler = "Euler" | "Euler a" | "Heun" | "DPM++ 2M Karras";

    interface Job {
        job: string;
        status: "succeeded" | "failed";
        imageUrl?: string;
    }

    interface Options {
        model: modelName
        prompt: string
        negative_prompt?: string
        seed?: number
        steps?: number
        cfg_scale?: number
        aspect_ratio: aspectRatio
        sampler: sampler
        upscale?: boolean
    }

    function key(apiKey: string): void;
    function createJob(options: Options): Promise<Job>;
    function getJob(jobId: string): Promise<Job>;
}