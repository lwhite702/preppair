
export interface AIModelConfig {
  apiKey: string;
  modelName?: string;
  temperature?: number;
}

export interface AIPromptTemplate {
  systemPrompt: string;
  userPrompt: string;
}

export interface AIResponse {
  content: string;
  error?: string;
}

export interface AIProvider {
  generateGuide(prompt: AIPromptTemplate): Promise<AIResponse>;
  setConfig(config: AIModelConfig): void;
}
