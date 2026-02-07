import { z } from 'zod';

export const ExpandTestingErrorSchema = z.object({
  error: z.string().min(1),
});

export type ExpandTestingError = z.infer<typeof ExpandTestingErrorSchema>;