import { expect, test } from '../../.././fixtures/pom/test-options';

test.describe('expandtesting api - status codes', () => {
    test(
        'should return 404 for unknown endpoint',
        { tag: ['@sanity', '@api'] },
        async ({ apiRequest }) => {
            const { status } = await apiRequest({
                method: 'GET',
                url: '/this-endpoint-should-not-exist',
                baseUrl: process.env.API_URL,
            });

            expect(status).toBe(404);
        }
    );
});
