import { expect, test } from '../../../fixtures/pom/test-options';
import {
    TimeResponse,
    TimeResponseSchema,
} from '../../../fixtures/api/schemas/expandtesting/timeSchema';

test.describe('expandtesting api - time', () => {
    test(
        'should return valid time payload',
        { tag: ['@sanity', '@api'] },
        async ({ apiRequest }) => {
            const { status, body } = await apiRequest<TimeResponse>({
                method: 'GET',
                url: '/time',
                baseUrl: process.env.API_URL,
            });

            expect(status).toBe(200);

            const parsed = TimeResponseSchema.parse(body);

            // basic sanity: ISO-ish timestamp (not perfect, but practical)
            expect(parsed.time).toMatch(/^\d{4}-\d{2}-\d{2}T/);
        }
    );
});
