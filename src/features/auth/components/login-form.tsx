import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { useLogin } from "../hooks/use-login";
import { useTranslation } from "react-i18next";
import { useTranslateError } from "@/hooks/use-translate-error";
import { SocialAuthSection } from "./social-auth-section";
import { FormInput } from "@/components/ui/form-input";
import { Form } from "@/components/ui/form";

export function LoginForm() {
	const { t } = useTranslation();
	const { translateError } = useTranslateError();
	const { form, isLoading, error, onSubmit, handleSocialSignIn } = useLogin();
	const { control, handleSubmit } = form;

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

						<FormInput
							control={control}
							name="password"
							label={t("auth.fields.password")}
							placeholder={t("auth.placeholders.password")}
							type="password"
							icon={<Lock className="size-4" />}
							disabled={isLoading}
						/>

						<div className="flex justify-end -mt-2">
							<Link
								to="/forgot-password"
								className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
							>
								{t("auth.login.forgot_password")}
							</Link>
						</div>

						{error && (
							<div className="bg-destructive/10 text-destructive text-sm p-4 rounded-xl border border-destructive/20 flex items-start gap-3">
								<div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">
									<span className="text-xs">!</span>
								</div>
								<span>{translateError(error) || error}</span>
							</div>
						)}

						<Button
							disabled={isLoading}
							className="w-full h-12 mt-2 text-base font-semibold shadow-travel hover:shadow-travel-lg transition-all duration-300 group"
							size="lg"
						>
							{isLoading ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<>
									{t("auth.login.submit")}
									<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
								</>
							)}
						</Button>
					</div>
				</form>
			</Form>

			<SocialAuthSection
				isLoading={isLoading}
				onSocialSignIn={handleSocialSignIn}
			/>

			<div className="text-center text-sm text-muted-foreground">
				{t("auth.login.no_account")}{" "}
				<Link
					to="/register"
					className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
				>
					{t("auth.login.sign_up_link")}
				</Link>
			</div>
		</div>
	);
}
