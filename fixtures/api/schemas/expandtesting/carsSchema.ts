import { z } from 'zod';

export const CarSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.string(),
    image: z.string(),
});

export const CarsResponseSchema = z.object({
    status: z.string(),
    cars: z.array(CarSchema),
});

export type Car = z.infer<typeof CarSchema>;
export type CarsResponse = z.infer<typeof CarsResponseSchema>;
