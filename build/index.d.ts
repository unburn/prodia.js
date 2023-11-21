export type JobParams = {
    job: String;
    status: "queued" | "generating" | "failed" | "succeeded";
    imageUrl: String;
}

export type JobOutput = {
    job: String;
    status: "queued" | "generating" | "failed" | "succeeded";
}

type StylePresent = "3d-model" | "analog-film" | "anime" | "cinematic" | "comic-book" | "digital-art" | "enhance" | "fantasty-art" | "isometric" | "line-art" | "low-poly" | "neon-punk" | "origami" | "photographic" | "pixel-art" | "texture" | "craft-clay"

export type GenerateImageParams = {
    model: string;
    prompt: string;
    negative_prompt?: string;
    style_preset?: StylePresent;
    steps?: number;
    cfg_scale?: number;
    seed?: number;
    upscale?: boolean;
    sampler?: boolean;
    aspect_ratio?: "square" | "portrait" | "landscape";
}

type ImageInput = {
    imageUrl: string;
} | {
    imageData: string;
}

type MaskInput = {
    maskUrl: string
} | {
    maskData: string
}

export type TransformImageParams = ImageInput & {
    model: string;
    prompt: string;
    denoising_strength?: string;
    negative_prompt?: string;
    style_preset?: StylePresent;
    steps?: number;
    cfg_scale?: number;
    seed?: number;
    upscale?: number;
    sampler?: string;
    width?: number;
    height?: number;
}

export type InpaintParams = ImageInput & MaskInput & {
    model: string;
    prompt: string;
    denoising_strength?: number;
    negative_prompt?: string;
    style_preset?: StylePresent;
    steps?: number;
    cfg_scale?: number;
    seed?: number;
    upscale?: boolean;
    mask_blur?: number;
    inpainting_fill?: number;
    inpainting_mask_invert?: number;
    inpainting_full_res?: boolean;
    sampler?: string;
}

export type ControlNetParams = ImageInput & {
    model: string;
    controlnet_model: string;
    controlnet_module: string;
    control_mode?: 0 | 1 | 2;
    threshold_a?: number;
    threshold_b?: number;
    resize_mode?: 0 | 1 | 2;
    prompt: string;
    negative_prompt?: string;
    style_preset?: StylePresent;
    steps?: number;
    cfg_scale?: number;
    steps?: number;
    sampler?: string;
    height?: number;
    width?: number;
}

export type SDXLParams = {
    model: string;
    prompt: string;
    negative_prompt?: string;
    style_preset?: StylePresent;
    steps?: number;
    cfg_scale?: number;
    seed?: number;
    sampler?: string;
    width?: number;
    height?: number;
}

export type transformSDXLImageParams = ImageInput & {
    model: string;
    prompt: string;
    denoising_strength?: string;
    negative_prompt?: string;
    style_preset?: StylePresent;
    steps?: number;
    cfg_scale?: number;
    seed?: number;
    upscale?: number;
    sampler?: string;
    width?: number;
    height?: number;
}

export type inPaintSDXLParams = ImageInput & MaskInput & {
    model: string;
    prompt: string;
    denoising_strength?: number;
    negative_prompt?: string;
    style_preset?: StylePresent;
    steps?: number;
    cfg_scale?: number;
    seed?: number;
    upscale?: boolean;
    mask_blur?: number;
    inpainting_fill?: number;
    inpainting_mask_invert?: number;
    inpainting_full_res?: boolean;
    sampler?: string;
    width?: number;
    height?: number;
}

export type UpscaleParams = ImageInput & {
    resize: 2 | 4
}

export declare class Prodia {
    constructor(apiKey: string);
    public generateImage(params: GenerateImageParams): Promise<JobOutput>;
    public transformImage(params: TransformImageParams): Promise<JobOutput>;
    public inPaint(params: InpaintParams): Promise<JobOutput>;
    public controlNet(params: ControlNetParams): Promise<JobOutput>;
    public SDXL(params: SDXLParams): Promise<JobOutput>;
    public transformSDXLImage(params: transformSDXLImageParams): Promise<JobOutput>;
    public inPaintSDXL(params: inPaintSDXLParams): Promise<JobOutput>;
    public upscale(params: UpscaleParams): Promise<JobOutput>
    public getJob(jobId: String): Promise<JobParams>;
    public getSDmodels(): Promise<void>;
    public getSDXLmodels(): Promise<void>;
    public getSDsamplers(): Promise<void>;
    public getSDXLsamplers(): Promise<void>;
    public getSDloras(): Promise<void>;
    public getSDXLloras(): Promise<void>;
}