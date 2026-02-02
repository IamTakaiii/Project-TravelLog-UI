import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import {
	type RegisterFormValues,
	registerSchema,
} from "../schemas/register-schema";

export function useRegister() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(data: RegisterFormValues) {
		setIsLoading(true);
		setError(null);
		try {
			const { error: signUpError } = await authClient.signUp.email({
				email: data.email,
				password: data.password,
				name: data.name,
			});

			if (signUpError) {
				// Map error codes to user-friendly messages
				const errorMessage = getErrorMessage(signUpError.code);
				setError(errorMessage);
			} else {
				// Navigate to dashboard on success
				navigate({ to: "/" });
			}
		} catch (err) {
			console.error("Registration error:", err);
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	const handleSocialSignUp = async (provider: "github" | "google") => {
		setIsLoading(true);
		setError(null);
		try {
			await authClient.signIn.social({
				provider,
				callbackURL: "/dashboard",
			});
		} catch (err) {
			console.error("Social sign-up error:", err);
			setError(`Failed to connect with ${provider}. Please try again.`);
			setIsLoading(false);
		}
	};

	return {
		form,
		isLoading,
		error,
		onSubmit,
		handleSocialSignUp,
		clearError: () => setError(null),
	};
}

function getErrorMessage(code?: string): string {
	switch (code) {
		case "USER_ALREADY_EXISTS":
			return "An account with this email already exists.";
		case "INVALID_EMAIL":
			return "Please enter a valid email address.";
		case "WEAK_PASSWORD":
			return "Password is too weak. Please choose a stronger password.";
		case "TOO_MANY_REQUESTS":
			return "Too many registration attempts. Please try again later.";
		default:
			return "Failed to create account. Please try again.";
	}
}
