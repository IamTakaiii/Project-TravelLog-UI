import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { clearSessionCache } from "@/lib/api-client";
import { authQueryKeys } from "@/features/auth/queries/auth-queries";
import {
	type RegisterFormValues,
	registerSchema,
} from "../schemas/register-schema";
import { getAuthErrorMessage } from "../utils/auth-utils";

export function useRegister() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const registerMutation = useMutation({
		mutationFn: async (data: RegisterFormValues) => {
			const { error } = await authClient.signUp.email({
				email: data.email,
				password: data.password,
				name: data.name,
			});
			if (error) throw error;
		},
		onSuccess: () => {
			clearSessionCache();
			queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
			navigate({ to: "/" });
		},
	});

	const socialRegisterMutation = useMutation({
		mutationFn: async (provider: "github" | "google") => {
			const { error } = await authClient.signIn.social({
				provider,
				callbackURL: "/",
			});
			if (error) throw error;
		},
	});

	async function onSubmit(data: RegisterFormValues) {
		registerMutation.mutate(data);
	}

	const handleSocialSignUp = async (provider: "github" | "google") => {
		socialRegisterMutation.mutate(provider);
	};

	const error = registerMutation.error || socialRegisterMutation.error;
	const errorMessage = error ? getAuthErrorMessage(error.message as any) : null;

	return {
		form,
		isLoading: registerMutation.isPending || socialRegisterMutation.isPending,
		error: errorMessage,
		onSubmit,
		handleSocialSignUp,
		clearError: () => {
			registerMutation.reset();
			socialRegisterMutation.reset();
		},
	};
}
