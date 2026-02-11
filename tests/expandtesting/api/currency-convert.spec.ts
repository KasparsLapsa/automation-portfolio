import { expect, test } from '../../../fixtures/pom/test-options';
import { CurrencyConvertResponseSchema } from '../../../fixtures/api/schemas/expandtesting/currencyConvertSchema';

test.describe('expandtesting api - currency convert', () => {
    test(
        'should convert currency and match contract',
        { tag: ['@smoke', '@api'] },
        async ({ apiRequest }) => {
            const from = 'USD';
            const to = 'EUR';
            const amount = 100;

            const { status, body } = await apiRequest<unknown>({
                method: 'GET',
                url: `/currency-convert?from=${from}&to=${to}&amount=${amount}`,
                baseUrl: process.env.API_URL,
            });

            expect(status).toBe(200);

            const parsed = CurrencyConvertResponseSchema.parse(body);

            expect(parsed.from).toBe(from);
            expect(parsed.to).toBe(to);
            expect(parsed.amount).toBe(amount);

            expect(parsed.rate).toBeGreaterThan(0);
            expect(parsed.converted).toBeGreaterThan(0);

            expect(parsed.converted).toBeCloseTo(
                parsed.amount * parsed.rate,
                5
            );
        }
    );
});
