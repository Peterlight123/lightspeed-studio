export interface GeneratorInputs {
  topic: string;
  niche: string;
  audience: string;
}

export interface TitleResult {
  title: string;
  score?: number;
}

export interface HookResult {
  hook: string;
  type: string;
}

export interface GenerationResponse {
  freeTitles: string[];
  freeHooks: string[];
  premiumTitles: string[];
  premiumThumbnailText: string[];
  premiumHookFormulas: string[];
  premiumDescriptionTemplate: string;
}
