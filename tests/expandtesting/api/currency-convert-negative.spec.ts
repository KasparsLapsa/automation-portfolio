import { expect, test } from '../../../fixtures/pom/test-options';
import { ExpandTestingErrorSchema } from '../../../fixtures/api/schemas/expandtesting/errorSchema';

test.describe('expandtesting api - currency convert (negative)', () => {
  test(
    'should return 400 for invalid amount',
    { tag: ['@sanity', '@api'] },
    async ({ apiRequest }) => {
      const { status, body } = await apiRequest<unknown>({
        method: 'GET',
        url: '/currency-convert?from=USD&to=EUR&amount=abc',
        baseUrl: process.env.API_URL,
      });

      expect(status).toBe(400);

      const parsed = ExpandTestingErrorSchema.parse(body);
      expect(parsed.error).toBe('Missing or invalid parameters');
    }
  );
});
