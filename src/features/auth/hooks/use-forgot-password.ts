import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import {
	ForgotPasswordFormValues,
	forgotPasswordSchema,
} from "../schemas/forgot-password-schema";
import { getAuthErrorMessage } from "../utils/auth-utils";

export function useForgotPassword() {
	const form = useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const forgotPasswordMutation = useMutation({
		mutationFn: async (data: ForgotPasswordFormValues) => {
			const { error } = await authClient.requestPasswordReset({
				email: data.email,
				redirectTo: "/reset-password",
			});
			if (error) throw error;
		},
	});

	const onSubmit = (data: ForgotPasswordFormValues) => {
		forgotPasswordMutation.mutate(data);
	};

	const resetForm = () => {
		form.reset();
		forgotPasswordMutation.reset();
	};

	return {
		form,
		isLoading: forgotPasswordMutation.isPending,
		error: forgotPasswordMutation.error
			? getAuthErrorMessage(forgotPasswordMutation.error.message as any)
			: null,
		isSuccess: forgotPasswordMutation.isSuccess,
		onSubmit,
		resetForm,
	};
}
