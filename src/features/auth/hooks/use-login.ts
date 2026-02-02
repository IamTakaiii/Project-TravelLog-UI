import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { type LoginFormValues, loginSchema } from "../schemas/login-schema";

export function useLogin() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: LoginFormValues) {
		setIsLoading(true);
		setError(null);
		try {
			const { error: signInError } = await authClient.signIn.email({
				email: data.email,
				password: data.password,
			});

			if (signInError) {
				// Map error codes to user-friendly messages
				const errorMessage = getErrorMessage(signInError.code);
				setError(errorMessage);
			} else {
				// Navigate to dashboard on success
				navigate({ to: "/" });
			}
		} catch (err) {
			console.error("Login error:", err);
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	const handleSocialSignIn = async (provider: "github" | "google") => {
		setIsLoading(true);
		setError(null);
		try {
			await authClient.signIn.social({
				provider,
				callbackURL: "/",
			});
		} catch (err) {
			console.error("Social sign-in error:", err);
			setError(`Failed to connect with ${provider}. Please try again.`);
			setIsLoading(false);
		}
	};

	return {
		form,
		isLoading,
		error,
		onSubmit,
		handleSocialSignIn,
		clearError: () => setError(null),
	};
}

function getErrorMessage(code?: string): string {
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
		default:
			return "Failed to sign in. Please try again.";
	}
}
