import { error } from 'console';
import { custom, z } from 'zod'; 


export const chatRequest = z.object({
  userId: z.string(),
  input: z.string().max(200, 'Input must be less than 200 characters'),
  llmModel: z.string().optional().default('openai'),
  llmVersion: z.string().optional().default('gpt-3.5-turbo'),
});

export const customChatRequest = z.object({
  userId: z.string(),
  input: z.string().max(200, 'Input must be less than 200 characters'),
  llmModel: z.string().optional().default('openai'),
  llmVersion: z.string().optional().default('gpt-3.5-turbo'),
  customChat: z.string(),
});

export interface APIResponse {
  response: string,
  warning?: string,
  error?: string,
}