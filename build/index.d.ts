interface Job {
    job: String,
    status: String,
    imageUrl: String
}

interface generateImageParams {
    job: String,
    status: String
}

export declare class Prodia {
    constructor(apiKey: string);

    public generateImage(params: {
        model?: String,
        prompt: String,
        negativePrompt?: String,
        steps?: Number,
        cfgScale?: Number,
        seed?: Number,
        upscale?: Boolean,
        sampler?: String,
        aspectRatio?: Number,
    }): Promise<generateImageParams>;

    public transformImage(params: {
        imageUrl: String,
        model?: String,
        prompt: String,
        negativePrompt?: String,
        steps?: Number,
        cfgScale?: Number,
        seed?: Number,
        upscale?: Boolean,
        sampler?: String,
    }): Promise<void>;

    public controlNet(params: {
        imageUrl: String,
        cnModel?: String,
        cnModule?: String,
        thresholdA?: Number,
        thresholdB?: Number,
        resizeMode?: Number,
        prompt: String,
        negativePrompt?: String,
        steps?: Number,
        cfgScale?: Number,
        sampler?: String,
        height?: Number,
        width?: Number
    }): Promise<void>;

    public sdxl(params: {
        model?: String,
        prompt: String,
        negativePrompt?: String,
        steps?: Number,
        cfgScale?: Number,
        seed?: Number,
        sampler?: String
    }): Promise<void>;


    public getJob(jobId: String): Promise<Job>;

    public getModels(): Promise<void>;
}