import {
	Loader2,
	Github,
	Mail,
	Lock,
	User,
	ShieldCheck,
	ArrowRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { useRegister } from "../hooks/use-register";
import { useTranslation } from "react-i18next";
import { useTranslateError } from "@/hooks/use-translate-error";
import { AuthFormField } from "./auth-form-field";

export function RegisterForm() {
	const { t } = useTranslation();
	const { translateError } = useTranslateError();
	const { form, isLoading, error, onSubmit, handleSocialSignUp } =
		useRegister();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	return (
		<div className="grid gap-6">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid gap-5">
					<AuthFormField
						label={t("auth.fields.name")}
						name="name"
						register={register}
						errors={errors}
						icon={User}
						placeholder={t("auth.placeholders.name")}
						autoCapitalize="none"
						autoCorrect="off"
						isLoading={isLoading}
					/>

					<AuthFormField
						label={t("auth.fields.email")}
						name="email"
						register={register}
						errors={errors}
						icon={Mail}
						placeholder={t("auth.placeholders.email")}
						type="email"
						autoCapitalize="none"
						autoCorrect="off"
						autoComplete="email"
						isLoading={isLoading}
					/>

					<AuthFormField
						label={t("auth.fields.password")}
						name="password"
						register={register}
						errors={errors}
						icon={Lock}
						placeholder={t("auth.placeholders.password")}
						type="password"
						autoComplete="new-password"
						isLoading={isLoading}
					/>

					<AuthFormField
						label={t("auth.fields.confirm_password")}
						name="confirmPassword"
						register={register}
						errors={errors}
						icon={ShieldCheck}
						placeholder={t("auth.placeholders.password")}
						type="password"
						autoComplete="new-password"
						isLoading={isLoading}
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
								{t("auth.register.submit")}
								<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
							</>
						)}
					</Button>
				</div>
			</form>

			{/* Divider */}
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t border-border/50" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-4 text-muted-foreground font-medium">
						{t("auth.social.or_continue_with")}
					</span>
				</div>
			</div>

			{/* Social Sign Up */}
			<Button
				variant="outline"
				type="button"
				disabled={isLoading}
				onClick={() => handleSocialSignUp("github")}
				className="w-full h-12 border-border hover:bg-muted/50 transition-colors text-foreground"
			>
				<Github className="mr-2 h-5 w-5 text-foreground" />
				{t("auth.social.github")}
			</Button>

			{/* Sign In Link */}
			<div className="text-center text-sm text-muted-foreground">
				{t("auth.register.have_account")}{" "}
				<Link
					to="/login"
					className="font-semibold text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
				>
					{t("auth.register.sign_in_link")}
				</Link>
			</div>
		</div>
	);
}
