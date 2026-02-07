import { z } from 'zod';

/**
 * Schema for 400 Bad Request responses.
 */
export const BadRequestResponseSchema = z.object({
    message: z.union([z.string(), z.array(z.string())]),
    error: z.literal('Bad Request'),
    statusCode: z.literal(400),
});

/**
 * Schema for 401 Unauthorized responses.
 */
export const UnauthorizedResponseSchema = z.object({
    message: z.literal('Unauthorized'),
    statusCode: z.literal(401),
});

/**
 * Schema for 403 Forbidden responses.
 */
export const ForbiddenResponseSchema = z.object({
    message: z.string(),
    error: z.literal('Forbidden'),
    statusCode: z.literal(403),
});

/**
 * Schema for 404 Not Found responses.
 */
export const NotFoundResponseSchema = z.object({
    message: z.string(),
    error: z.literal('Not Found'),
    statusCode: z.literal(404),
});

// Type exports
export type BadRequestResponse = z.infer<typeof BadRequestResponseSchema>;
export type UnauthorizedResponse = z.infer<typeof UnauthorizedResponseSchema>;
export type ForbiddenResponse = z.infer<typeof ForbiddenResponseSchema>;
export type NotFoundResponse = z.infer<typeof NotFoundResponseSchema>;
