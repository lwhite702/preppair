
import { AIProvider, AIModelConfig } from './types';
import { OpenAIProvider } from './openai-provider';

export type ProviderType = 'openai' | 'deepseek' | 'claude';

export class AIProviderFactory {
  private static providers: Map<ProviderType, AIProvider> = new Map();

  static getProvider(type: ProviderType, config: AIModelConfig): AIProvider {
    if (!this.providers.has(type)) {
      switch (type) {
        case 'openai':
          const provider = new OpenAIProvider();
          provider.setConfig(config);
          this.providers.set(type, provider);
          break;
        // Add other providers here when needed
        default:
          throw new Error(`Provider ${type} not implemented`);
      }
    }
    return this.providers.get(type)!;
  }
}

// Export a function to get the default AI provider
export const getAIProvider = (type: ProviderType = 'openai'): AIProvider => {
  // Use environment variable or fallback to empty string
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
  
  console.log("API Key status:", apiKey ? "Available" : "Not available");
  
  return AIProviderFactory.getProvider(type, { 
    apiKey,
    modelName: 'gpt-4o-mini',
    temperature: 0.7
  });
};
