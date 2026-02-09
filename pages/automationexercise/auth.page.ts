import { expect, Locator, Page } from '@playwright/test';
import { acceptConsentIfVisible } from '../../helpers/util/consent';
import { AeUser } from '../../test-data/ui/user.factory';
import { NavBar } from '../../components/automationexercise/navbar.component';

export class AuthPage {
    readonly page: Page;
    readonly nav: NavBar;

    // Signup (first screen)
    readonly signupName: Locator;
    readonly signupEmail: Locator;
    readonly signupButton: Locator;

    // Account details screen
    readonly titleMr: Locator;
    readonly password: Locator;
    readonly days: Locator;
    readonly months: Locator;
    readonly years: Locator;

    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly company: Locator;
    readonly address1: Locator;
    readonly address2: Locator;
    readonly country: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly zipcode: Locator;
    readonly mobileNumber: Locator;

    readonly createAccountButton: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nav = new NavBar(page);

        // These use data-qa => requires testIdAttribute: 'data-qa'
        this.signupName = page.getByTestId('signup-name');
        this.signupEmail = page.getByTestId('signup-email');
        this.signupButton = page.getByTestId('signup-button');

        this.titleMr = page.getByRole('radio', { name: /^Mr\.$/i });
        this.password = page.getByTestId('password');
        this.days = page.getByTestId('days');
        this.months = page.getByTestId('months');
        this.years = page.getByTestId('years');

        this.firstName = page.getByTestId('first_name');
        this.lastName = page.getByTestId('last_name');
        this.company = page.getByTestId('company');
        this.address1 = page.getByTestId('address');
        this.address2 = page.getByTestId('address2');
        this.country = page.getByTestId('country');
        this.state = page.getByTestId('state');
        this.city = page.getByTestId('city');
        this.zipcode = page.getByTestId('zipcode');
        this.mobileNumber = page.getByTestId('mobile_number');

        this.createAccountButton = page.getByTestId('create-account');
        this.continueButton = page.getByTestId('continue-button');
    }

    async open(): Promise<void> {
        const base = process.env.APP_URL;
        if (!base) throw new Error('APP_URL is not set');

        await this.page.goto(`${base}/login`);
        await acceptConsentIfVisible(this.page);
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

        await this.titleMr.check();
        await this.password.fill(user.password);

        // basic DOB
        await this.days.selectOption('1');
        await this.months.selectOption('1');
        await this.years.selectOption('1990');

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

        // Continue sometimes goes to an interstitial; keep it simple
        await this.continueButton.click();
        await acceptConsentIfVisible(this.page);

        await this.nav.expectLoggedIn();
    }
}
