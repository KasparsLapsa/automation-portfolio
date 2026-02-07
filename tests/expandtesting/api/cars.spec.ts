import { expect, test } from '../../../fixtures/pom/test-options';
import { CarsResponseSchema } from '../../../fixtures/api/schemas/expandtesting/carsSchema';

test.describe('expandtesting api - cars', () => {
  test(
    'should return cars payload matching contract',
    { tag: ['@sanity', '@api'] },
    async ({ apiRequest }) => {
      const { status, body } = await apiRequest<unknown>({
        method: 'GET',
        url: '/cars',
        baseUrl: process.env.API_URL,
      });

      expect(status).toBe(200);

      const parsed = CarsResponseSchema.parse(body);

      expect(parsed.status).toBe('success');
      expect(parsed.cars.length).toBeGreaterThan(0);

      const first = parsed.cars[0];
      expect(first.id).toBeGreaterThan(0);
      expect(first.name).toBeTruthy();
      expect(first.price).toMatch(/^(?:\p{Sc}|\bEUR\b|€)/u);
      expect(first.image).toMatch(/^\/|^https?:\/\//);
    }
  );
});
