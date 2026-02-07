import { expect, test } from '../../../fixtures/pom/test-options';

test.describe('expandtesting api - health', () => {
  test(
    'should return 200',
    { tag: ['@smoke', '@api'] },
    async ({ apiRequest }) => {
      const { status } = await apiRequest({
        method: 'GET',
        url: '/health-check',
        baseUrl: process.env.API_URL,
      });

      expect(status).toBe(200);
    }
  );
});
