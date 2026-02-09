export type AeUser = {
    name: string;
    email: string;
    password: string;
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

function uniqueEmail(prefix = 'kaspars'): string {
    const ts = Date.now();
    return `${prefix}.${ts}@mailinator.com`;
}

export function createAeUser(overrides: Partial<AeUser> = {}): AeUser {
    return {
        name: 'Kaspars',
        email: uniqueEmail('kaspars'),
        password: 'Test12345!',
        firstName: 'Kaspars',
        lastName: 'Lapsa',
        company: 'Automation Portfolio',
        address1: '1 Test Street',
        address2: 'Apt 2',
        country: 'Canada',
        state: 'QC',
        city: 'Montreal',
        zipCode: 'H1A1A1',
        mobileNumber: '+37120000000',
        ...overrides,
    };
}
