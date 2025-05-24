'use server';
/**
 * @fileOverview Analyzes a URL for potential phishing indicators using AI.
 *
 * - analyzeUrl - Analyzes the URL of the current website and identifies potential phishing indicators.
 * - AnalyzeUrlInput - The input type for the analyzeUrl function.
 * - AnalyzeUrlOutput - The return type for the analyzeUrl function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUrlInputSchema = z.object({
  url: z.string().describe('The URL to analyze.'),
});
export type AnalyzeUrlInput = z.infer<typeof AnalyzeUrlInputSchema>;

const AnalyzeUrlOutputSchema = z.object({
  isPhishing: z.boolean().describe('Whether the URL is likely a phishing site.'),
  riskLevel: z
    .string()
    .describe(
      'The risk level of the URL, can be low, medium, or high. If isPhishing is true, should not be low.'
    ),
  reason: z.string().describe('The reason for the risk level determination.'),
});
export type AnalyzeUrlOutput = z.infer<typeof AnalyzeUrlOutputSchema>;

export async function analyzeUrl(input: AnalyzeUrlInput): Promise<AnalyzeUrlOutput> {
  return analyzeUrlFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeUrlPrompt',
  input: {schema: AnalyzeUrlInputSchema},
  output: {schema: AnalyzeUrlOutputSchema},
  prompt: `You are a security expert analyzing URLs for phishing attempts.

  Analyze the following URL and determine if it is a phishing attempt.
  Provide a riskLevel of either low, medium, or high.
  If isPhishing is true, riskLevel should not be low.

  Explain your reasoning for the risk level.

  URL: {{{url}}}`,
});

const analyzeUrlFlow = ai.defineFlow(
  {
    name: 'analyzeUrlFlow',
    inputSchema: AnalyzeUrlInputSchema,
    outputSchema: AnalyzeUrlOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
