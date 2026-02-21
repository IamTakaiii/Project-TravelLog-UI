import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { clearSessionCache } from "@/lib/api-client";
import { authQueryKeys } from "@/features/auth/queries/auth-queries";
import { type LoginFormValues, loginSchema } from "../schemas/login-schema";
import { getAuthErrorMessage } from "../utils/auth-utils";

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
			clearSessionCache();
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
	const errorMessage = error ? getAuthErrorMessage(error.message as any) : null;

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
