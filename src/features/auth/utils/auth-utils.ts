export function getAuthErrorMessage(code?: string): string {
    switch (code) {
        case "INVALID_EMAIL_OR_PASSWORD":
            return "Invalid email or password. Please check your credentials.";
        case "USER_NOT_FOUND":
            return "No account found with this email address.";
        case "EMAIL_NOT_VERIFIED":
            return "Please verify your email address before signing in.";
        case "TOO_MANY_REQUESTS":
            return "Too many login attempts. Please try again later.";
        case "ACCOUNT_LOCKED":
            return "Your account has been locked. Please contact support.";
        case "USER_ALREADY_EXISTS":
            return "An account with this email already exists.";
        case "INVALID_EMAIL":
            return "Please enter a valid email address.";
        case "WEAK_PASSWORD":
            return "Password is too weak. Please choose a stronger password.";
        default:
            return "Authentication failed. Please try again.";
    }
}
