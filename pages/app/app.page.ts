import { expect, Locator, Page } from '@playwright/test';
import { ApiEndpoints, Messages } from '../../enums/app/app';
import { NavigationComponent } from '../components/navigation.component';

/**
 * Page Object for the main application page.
 * Contains locators and methods for interacting with the application.
 *
 * This example demonstrates the recommended locator priority:
 * 1. getByRole() - Accessibility-based (most recommended)
 * 2. getByLabel() - Form labels
 * 3. getByPlaceholder() - Placeholder text
 * 4. getByText() - Text content
 * 5. getByTestId() - Test IDs (fallback when semantic locators aren't possible)
 *
 * This also demonstrates the component composition pattern where reusable
 * UI components (like NavigationComponent) are composed into page objects.
 */
export class AppPage {
    /** Navigation component for header/nav interactions */
    readonly nav: NavigationComponent;

    constructor(private readonly page: Page) {
        this.nav = new NavigationComponent(page);
    }

    // ==================== Locators ====================

    /**
     * The main application title element.
     * Uses getByRole() - the most recommended approach for headings.
     */
    get appTitle(): Locator {
        return this.page.getByRole('heading', { name: 'Application Title' });
    }

    /**
     * The username display element (visible when logged in).
     * Uses getByTestId() - fallback when semantic locators aren't available.
     */
    get username(): Locator {
        return this.page.getByTestId('username');
    }

    /**
     * The email input field on the login form.
     * Uses getByLabel() - recommended for form inputs with labels.
     */
    get emailInput(): Locator {
        return this.page.getByLabel('Email');
    }

    /**
     * The password input field on the login form.
     * Uses getByLabel() - recommended for form inputs with labels.
     */
    get passwordInput(): Locator {
        return this.page.getByLabel('Password');
    }

    /**
     * The login submit button.
     * Uses getByRole() - most recommended for interactive elements.
     */
    get loginButton(): Locator {
        return this.page.getByRole('button', { name: 'Login' });
    }

    /**
     * The error message element displayed on login failure.
     * Uses getByText() - good for static text content.
     */
    get errorMessage(): Locator {
        return this.page.getByText(Messages.LOGIN_ERROR);
    }

    // ==================== Actions ====================

    /**
     * Navigates to the application home page using the configured APP_URL.
     * Waits for the page to reach DOM content loaded state.
     *
     * @returns {Promise<void>} Resolves when navigation is complete.
     */
    async openHomePage(): Promise<void> {
        await this.page.goto(process.env.APP_URL!, {
            waitUntil: 'domcontentloaded',
        });
    }

    /**
     * Performs login with the provided credentials and waits for login response.
     * Fills in the email and password fields, clicks the login button,
     * and waits for the login API response.
     *
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {Promise<void>} Resolves when login request completes.
     *
     * @example
     * ```ts
     * await appPage.login('user@example.com', 'password123');
     * await expect(appPage.username).toBeVisible();
     * ```
     */
    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);

        await this.loginButton.click();

        // Wait for login API response
        await this.page.waitForResponse(
            (response) =>
                response.url().includes(ApiEndpoints.LOGIN) &&
                response.request().method() === 'POST'
        );
    }

    /**
     * Performs login and verifies successful login by checking username visibility.
     * Use this method when you expect the login to succeed.
     *
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {Promise<void>} Resolves when login is verified successful.
     */
    async loginAndVerify(email: string, password: string): Promise<void> {
        await this.login(email, password);
        await expect(this.username).toBeVisible();
    }
}
