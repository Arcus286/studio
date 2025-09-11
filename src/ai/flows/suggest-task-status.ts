'use server';

/**
 * @fileOverview An AI agent that suggests the most appropriate status for a task.
 *
 * - suggestTaskStatus - A function that suggests the task status.
 * - SuggestTaskStatusInput - The input type for the suggestTaskStatus function.
 * - SuggestTaskStatusOutput - The return type for the suggestTaskStatus function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTaskStatusInputSchema = z.object({
  taskDescription: z.string().describe('The description of the task.'),
  recentActivity: z.string().describe('The recent activity related to the task.'),
});
export type SuggestTaskStatusInput = z.infer<typeof SuggestTaskStatusInputSchema>;

const SuggestTaskStatusOutputSchema = z.object({
  suggestedStatus: z
    .enum(['To Do', 'In Progress', 'Done'])
    .describe('The suggested status for the task.'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('The confidence level of the suggested status, between 0 and 1.'),
  reason: z.string().describe('The reason for the suggested status.'),
});
export type SuggestTaskStatusOutput = z.infer<typeof SuggestTaskStatusOutputSchema>;

export async function suggestTaskStatus(input: SuggestTaskStatusInput): Promise<SuggestTaskStatusOutput> {
  return suggestTaskStatusFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaskStatusPrompt',
  input: {schema: SuggestTaskStatusInputSchema},
  output: {schema: SuggestTaskStatusOutputSchema},
  prompt: `You are a project management assistant. You will suggest the most appropriate status for a task based on its description and recent activity.

Task Description: {{{taskDescription}}}
Recent Activity: {{{recentActivity}}}

Consider the task description and recent activity to determine whether the task is 'To Do', 'In Progress', or 'Done'.

Respond in a JSON format with the suggested status, a confidence level between 0 and 1, and a brief reason for the suggestion.`,
});

const suggestTaskStatusFlow = ai.defineFlow(
  {
    name: 'suggestTaskStatusFlow',
    inputSchema: SuggestTaskStatusInputSchema,
    outputSchema: SuggestTaskStatusOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
