import { GoogleGenAI, Type } from "@google/genai";
import { GeneratorInputs, GenerationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateViralContent(inputs: GeneratorInputs): Promise<GenerationResponse> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Act as a YouTube Growth Expert and Viral Strategist. 
    Generate viral content for a YouTube video with the following details:
    Topic: ${inputs.topic}
    Niche: ${inputs.niche}
    Target Audience: ${inputs.audience}

    I need:
    1. 5 viral titles for the free version.
    2. 2 thumbnail hook ideas for the free version.
    3. 50 additional viral titles for the premium version.
    4. 10 thumbnail text ideas for the premium version.
    5. 10 viral hook formulas for the premium version.
    6. A comprehensive YouTube description template optimized for SEO.

    Ensure titles are high-CTR, curiosity-driven, and use psychological triggers like "The Secret", "Why I Quit", "How to...", etc.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          freeTitles: { type: Type.ARRAY, items: { type: Type.STRING } },
          freeHooks: { type: Type.ARRAY, items: { type: Type.STRING } },
          premiumTitles: { type: Type.ARRAY, items: { type: Type.STRING } },
          premiumThumbnailText: { type: Type.ARRAY, items: { type: Type.STRING } },
          premiumHookFormulas: { type: Type.ARRAY, items: { type: Type.STRING } },
          premiumDescriptionTemplate: { type: Type.STRING },
        },
        required: ["freeTitles", "freeHooks", "premiumTitles", "premiumThumbnailText", "premiumHookFormulas", "premiumDescriptionTemplate"],
      },
    },
  });

  return JSON.parse(response.text || "{}") as GenerationResponse;
}
