export function getAuthErrorMessage(code?: string): string {
	switch (code) {
		case "INVALID_EMAIL_OR_PASSWORD":
			return "auth.api_errors.INVALID_EMAIL_OR_PASSWORD";
		case "USER_NOT_FOUND":
			return "auth.api_errors.USER_NOT_FOUND";
		case "EMAIL_NOT_VERIFIED":
			return "auth.api_errors.EMAIL_NOT_VERIFIED";
		case "TOO_MANY_REQUESTS":
			return "auth.api_errors.TOO_MANY_REQUESTS";
		case "ACCOUNT_LOCKED":
			return "auth.api_errors.ACCOUNT_LOCKED";
		case "USER_ALREADY_EXISTS":
			return "auth.api_errors.USER_ALREADY_EXISTS";
		case "INVALID_EMAIL":
			return "auth.api_errors.INVALID_EMAIL";
		case "WEAK_PASSWORD":
			return "auth.api_errors.WEAK_PASSWORD";
		default:
			return "auth.api_errors.DEFAULT";
	}
}
