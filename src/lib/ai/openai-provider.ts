
import { AIProvider, AIModelConfig, AIPromptTemplate, AIResponse } from './types';

export class OpenAIProvider implements AIProvider {
  private config: AIModelConfig = {
    apiKey: '',
    modelName: 'gpt-4o-mini',
    temperature: 0.7
  };

  setConfig(config: AIModelConfig): void {
    this.config = { ...this.config, ...config };
  }

  async generateGuide(prompt: AIPromptTemplate): Promise<AIResponse> {
    try {
      if (!this.config.apiKey) {
        throw new Error("OpenAI API key is not configured");
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.modelName,
          messages: [
            { role: 'system', content: prompt.systemPrompt },
            { role: 'user', content: prompt.userPrompt }
          ],
          temperature: this.config.temperature,
          max_tokens: 2000,  // Ensuring enough length for comprehensive guides
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || `OpenAI API request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('OpenAI response received successfully');
      
      return {
        content: data.choices[0].message.content,
      };
    } catch (error) {
      console.error("Error in OpenAI provider:", error);
      return {
        content: "",
        error: error instanceof Error ? error.message : "An unknown error occurred"
      };
    }
  }
}
