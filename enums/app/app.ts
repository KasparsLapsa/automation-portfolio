/**
 * Application-specific constants.
 * Add your application's repeated string values here.
 *
 * @example
 * ```ts
 * import { Messages, ApiEndpoints } from '../../enums/app/app';
 *
 * await expect(page.getByText(Messages.LOGIN_SUCCESS)).toBeVisible();
 * ```
 */

/** Common UI messages */
export enum Messages {
    LOGIN_SUCCESS = 'Successfully logged in',
    LOGIN_FAILED = 'Invalid credentials',
    LOGIN_ERROR = 'Invalid email or password',
    LOGOUT_SUCCESS = 'You have been logged out',
    SESSION_EXPIRED = 'Your session has expired',
    REQUIRED_FIELD = 'This field is required',
}

/** API endpoint paths */
export enum ApiEndpoints {
    LOGIN = '/api/users/login',
    LOGOUT = '/api/users/logout',
    CURRENT_USER = '/api/users/me',
    REGISTER = '/api/users/register',
}

/** Storage state file paths */
export enum StorageStatePaths {
    APP = '.auth/app/appStorageState.json',
}
