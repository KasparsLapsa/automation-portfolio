import { expect, type Locator, type Page } from '@playwright/test';
import type { Consent } from '../../src/types';
import type { AeUser } from '../../test-data/ui/user.factory';
import { NavBar } from './components/navbar.component';

export class AuthPage {
    private readonly navBar: NavBar;

    constructor(
        private readonly page: Page,
        private readonly consent: Consent
    ) {
        this.navBar = new NavBar(page);
    }

    // Signup (first screen)
    get signupName(): Locator {
        return this.page.getByTestId('signup-name');
    }
    get signupEmail(): Locator {
        return this.page.getByTestId('signup-email');
    }
    get signupButton(): Locator {
        return this.page.getByTestId('signup-button');
    }

    // Account details screen
    get titleMr(): Locator {
        return this.page.getByRole('radio', { name: /^Mr\.$/i });
    }
    get titleMrs(): Locator {
        return this.page.getByRole('radio', { name: /^Mrs\.$/i });
    }

    get password(): Locator {
        return this.page.getByTestId('password');
    }
    get days(): Locator {
        return this.page.getByTestId('days');
    }
    get months(): Locator {
        return this.page.getByTestId('months');
    }
    get years(): Locator {
        return this.page.getByTestId('years');
    }

    get firstName(): Locator {
        return this.page.getByTestId('first_name');
    }
    get lastName(): Locator {
        return this.page.getByTestId('last_name');
    }
    get company(): Locator {
        return this.page.getByTestId('company');
    }
    get address1(): Locator {
        return this.page.getByTestId('address');
    }
    get address2(): Locator {
        return this.page.getByTestId('address2');
    }
    get country(): Locator {
        return this.page.getByTestId('country');
    }
    get state(): Locator {
        return this.page.getByTestId('state');
    }
    get city(): Locator {
        return this.page.getByTestId('city');
    }
    get zipcode(): Locator {
        return this.page.getByTestId('zipcode');
    }
    get mobileNumber(): Locator {
        return this.page.getByTestId('mobile_number');
    }

    get createAccountButton(): Locator {
        return this.page.getByTestId('create-account');
    }
    get continueButton(): Locator {
        return this.page.getByTestId('continue-button');
    }

    async open(): Promise<void> {
        await this.page.goto('/login');
        await this.consent.acceptIfVisible();
        await expect(this.page).toHaveURL(/\/login/i);
    }

    async signup(user: AeUser): Promise<void> {
        await this.signupName.fill(user.name);
        await this.signupEmail.fill(user.email);
        await this.signupButton.click();

        await expect(
            this.page.getByRole('heading', {
                name: /enter account information/i,
            })
        ).toBeVisible();

        if (user.title === 'mr') await this.titleMr.check();
        else await this.titleMrs.check();

        await this.password.fill(user.password);

        await this.days.selectOption(String(user.dob.day));
        await this.months.selectOption(String(user.dob.month));
        await this.years.selectOption(String(user.dob.year));

        await this.firstName.fill(user.firstName);
        await this.lastName.fill(user.lastName);
        await this.company.fill(user.company);
        await this.address1.fill(user.address1);
        await this.address2.fill(user.address2);
        await this.country.selectOption(user.country);
        await this.state.fill(user.state);
        await this.city.fill(user.city);
        await this.zipcode.fill(user.zipCode);
        await this.mobileNumber.fill(user.mobileNumber);

        await this.createAccountButton.click();

        await expect(
            this.page.getByRole('heading', { name: /account created!/i })
        ).toBeVisible();

        await this.continueButton.click();
        await this.consent.acceptIfVisible();

        await this.navBar.expectLoggedIn();
    }
}
