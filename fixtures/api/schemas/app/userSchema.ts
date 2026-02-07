import { z } from 'zod';

/**
 * Schema for user login response.
 * Customize this schema based on your API response structure.
 */
export const UserResponseSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    token: z.string(),
});

/**
 * Schema for user login request payload.
 */
export const LoginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

// Type exports
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
