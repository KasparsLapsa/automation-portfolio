import { z } from 'zod';

export const TimeResponseSchema = z.object({
    time: z.string(), // ISO timestamp
});

export type TimeResponse = z.infer<typeof TimeResponseSchema>;
