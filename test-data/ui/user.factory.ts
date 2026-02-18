import { faker } from '@faker-js/faker';

export type AeUserTitle = 'mr' | 'mrs';

export type AeUserDob = {
    day: number;
    month: number;
    year: number;
};

export type AeUser = {
    name: string;
    email: string;
    password: string;

    title: AeUserTitle;
    dob: AeUserDob;

    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country:
        | 'Canada'
        | 'United States'
        | 'India'
        | 'Australia'
        | 'Israel'
        | 'New Zealand'
        | 'Singapore';
    state: string;
    city: string;
    zipCode: string;
    mobileNumber: string;
};

function mailinatorEmail(prefix = 'kaspars'): string {
    const suffix = faker.string.alphanumeric(8).toLowerCase();
    return `${prefix}.${suffix}@mailinator.com`;
}

function strongEnoughPassword(): string {
    // Keep it deterministic-ish + valid (letters + digits + symbol)
    return `Test${faker.number.int({ min: 1000, max: 9999 })}!`;
}

function randomDob(): AeUserDob {
    const d = faker.date.birthdate({ min: 18, max: 60, mode: 'age' });
    return { day: d.getDate(), month: d.getMonth() + 1, year: d.getFullYear() };
}

function lvMobileNumber(): string {
    return `+3712${faker.string.numeric(7)}`;
}

export function createAeUser(overrides: Partial<AeUser> = {}): AeUser {
    const firstName = overrides.firstName ?? faker.person.firstName();
    const lastName = overrides.lastName ?? faker.person.lastName();

    return {
        name: overrides.name ?? `${firstName} ${lastName}`,
        email: overrides.email ?? mailinatorEmail(firstName.toLowerCase()),
        password: overrides.password ?? strongEnoughPassword(),

        title:
            overrides.title ??
            faker.helpers.arrayElement<AeUserTitle>(['mr', 'mrs']),
        dob: overrides.dob ?? randomDob(),

        firstName,
        lastName,
        company: overrides.company ?? faker.company.name(),
        address1: overrides.address1 ?? faker.location.streetAddress(),
        address2: overrides.address2 ?? faker.location.secondaryAddress(),
        country:
            overrides.country ??
            faker.helpers.arrayElement([
                'Canada',
                'United States',
                'India',
                'Australia',
                'Israel',
                'New Zealand',
                'Singapore',
            ]),
        state: overrides.state ?? faker.location.state({ abbreviated: true }),
        city: overrides.city ?? faker.location.city(),
        zipCode: overrides.zipCode ?? faker.location.zipCode(),
        mobileNumber: overrides.mobileNumber ?? lvMobileNumber(),

        ...overrides,
    };
}
