import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { authQueryKeys } from "@/features/auth/queries/auth-queries";
import { type LoginFormValues, loginSchema } from "../schemas/login-schema";

export function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const loginMutation = useMutation({
		mutationFn: async (data: LoginFormValues) => {
			const { error } = await authClient.signIn.email({
				email: data.email,
				password: data.password,
			});
			if (error) throw error;
		},
		onSuccess: () => {
			// Invalidate session query to ensure user data is fresh
			queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
			navigate({ to: "/" });
		},
	});

	const socialLoginMutation = useMutation({
		mutationFn: async (provider: "github" | "google") => {
			const { error } = await authClient.signIn.social({
				provider,
				callbackURL: "/",
			});
			if (error) throw error;
		},
	});

	async function onSubmit(data: LoginFormValues) {
		loginMutation.mutate(data);
	}

	const handleSocialSignIn = async (provider: "github" | "google") => {
		socialLoginMutation.mutate(provider);
	};

	const error = loginMutation.error || socialLoginMutation.error;
	const errorMessage = error ? getErrorMessage(error.message as any) : null;

	return {
		form,
		isLoading: loginMutation.isPending || socialLoginMutation.isPending,
		error: errorMessage,
		onSubmit,
		handleSocialSignIn,
		clearError: () => {
			loginMutation.reset();
			socialLoginMutation.reset();
		},
	};
}

function getErrorMessage(code?: string): string {
	// Basic mapping, can be expanded based on authClient error responses
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
