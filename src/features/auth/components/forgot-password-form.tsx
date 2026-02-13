import { Loader2, ArrowLeft, Mail, CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useForgotPassword } from "../hooks/use-forgot-password";
import { useTranslation } from "react-i18next";
import { useTranslateError } from "@/hooks/use-translate-error";
import { Link } from "@tanstack/react-router";
import { FormInput } from "@/components/ui/form-input";
import { Form } from "@/components/ui/form";

export function ForgotPasswordForm() {
	const { t } = useTranslation();
	const { translateError } = useTranslateError();
	const { form, isLoading, error, isSuccess, onSubmit, resetForm } =
		useForgotPassword();
	const {
		control,
		handleSubmit,
	} = form;

	// Success state - show confirmation message
	if (isSuccess) {
		return (
			<div className="grid gap-6">
				<div className="flex flex-col items-center justify-center space-y-6 text-center py-8">
					{/* Success Animation Container */}
					<div className="relative">
						<div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
						<div className="relative rounded-full bg-gradient-to-br from-primary/20 to-primary/10 p-6 border border-primary/20">
							<CheckCircle2 className="h-12 w-12 text-primary" />
						</div>
					</div>

					<div className="space-y-3 max-w-sm">
						<h3 className="text-2xl font-heading font-bold text-foreground">
							{t("auth.forgot_password.success_title")}
						</h3>
						<p className="text-muted-foreground leading-relaxed">
							{t("auth.forgot_password.success_description")}
						</p>
					</div>

					{/* Email Icon Animation */}
					<div className="flex items-center gap-2 text-primary/60 text-sm">
						<Mail className="h-4 w-4 animate-bounce" />
						<span>Check your inbox</span>
					</div>
				</div>

				<div className="flex flex-col gap-3">
					<Button
						variant="outline"
						onClick={resetForm}
						className="w-full h-12 border-border/50 hover:bg-muted/50 transition-colors"
					>
						<Mail className="mr-2 h-4 w-4" />
						{t("auth.forgot_password.try_another_email")}
					</Button>

					<Link to="/login" className="w-full">
						<Button
							variant="ghost"
							className="w-full h-12 text-muted-foreground hover:text-foreground group"
						>
							<ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
							{t("auth.forgot_password.back_to_login")}
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="grid gap-6">
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-5">
						<FormInput
							control={control}
							name="email"
							label={t("auth.fields.email")}
							placeholder={t("auth.placeholders.email")}
							type="email"
							icon={<Mail className="size-4" />}
							disabled={isLoading}
						/>

						{/* Error Message */}
						{error && (
							<div className="bg-destructive/10 text-destructive text-sm p-4 rounded-xl border border-destructive/20 flex items-start gap-3">
								<div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">
									<span className="text-xs">!</span>
								</div>
								<span>{translateError(error) || error}</span>
							</div>
						)}

						{/* Submit Button */}
						<Button
							disabled={isLoading}
							className="w-full h-12 mt-2 text-base font-semibold shadow-travel hover:shadow-travel-lg transition-all duration-300 group"
							size="lg"
						>
							{isLoading ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<>
									<Send className="mr-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
									{t("auth.forgot_password.submit")}
								</>
							)}
						</Button>
					</div>
				</form>
			</Form>

			{/* Back to Login */}
			<Link to="/login" className="w-full">
				<Button
					variant="ghost"
					className="w-full h-12 text-muted-foreground hover:bg-primary/10 group"
				>
					<ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
					{t("auth.forgot_password.back_to_login")}
				</Button>
			</Link>
		</div>
	);
}


