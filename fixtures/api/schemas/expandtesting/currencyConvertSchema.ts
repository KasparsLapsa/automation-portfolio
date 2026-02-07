import { z } from 'zod';

export const CurrencyConvertResponseSchema = z.object({
  from: z.string(),
  to: z.string(),
  rate: z.number(),
  amount: z.number(),
  converted: z.number(),
});

export type CurrencyConvertResponse = z.infer<
  typeof CurrencyConvertResponseSchema
>;
