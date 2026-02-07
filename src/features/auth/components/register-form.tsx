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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRegister } from "../hooks/use-register";
import { useTranslation } from "react-i18next";
import { useTranslateError } from "@/hooks/use-translate-error";

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
					{/* Name Field */}
					<div className="grid gap-2">
						<Label htmlFor="name" className="text-sm font-medium">
							{t("auth.fields.name")}
						</Label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								id="name"
								placeholder={t("auth.placeholders.name")}
								type="text"
								autoCapitalize="none"
								autoCorrect="off"
								disabled={isLoading}
								{...register("name")}
								className={cn(
									"pl-10 h-12 bg-muted/30 border-border/50 focus:bg-background transition-colors",
									errors.name &&
										"border-destructive focus-visible:ring-destructive/30"
								)}
							/>
						</div>
						{errors.name?.message && (
							<p className="text-sm text-destructive flex items-center gap-1.5">
								<span className="inline-block w-1 h-1 rounded-full bg-destructive" />
								{translateError(errors.name.message)}
							</p>
						)}
					</div>

					{/* Email Field */}
					<div className="grid gap-2">
						<Label htmlFor="email" className="text-sm font-medium">
							{t("auth.fields.email")}
						</Label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								id="email"
								placeholder={t("auth.placeholders.email")}
								type="email"
								autoCapitalize="none"
								autoComplete="email"
								autoCorrect="off"
								disabled={isLoading}
								{...register("email")}
								className={cn(
									"pl-10 h-12 bg-muted/30 border-border/50 focus:bg-background transition-colors",
									errors.email &&
										"border-destructive focus-visible:ring-destructive/30"
								)}
							/>
						</div>
						{errors.email?.message && (
							<p className="text-sm text-destructive flex items-center gap-1.5">
								<span className="inline-block w-1 h-1 rounded-full bg-destructive" />
								{translateError(errors.email.message)}
							</p>
						)}
					</div>

					{/* Password Field */}
					<div className="grid gap-2">
						<Label htmlFor="password" className="text-sm font-medium">
							{t("auth.fields.password")}
						</Label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								id="password"
								placeholder={t("auth.placeholders.password")}
								type="password"
								autoComplete="new-password"
								disabled={isLoading}
								{...register("password")}
								className={cn(
									"pl-10 h-12 bg-muted/30 border-border/50 focus:bg-background transition-colors",
									errors.password &&
										"border-destructive focus-visible:ring-destructive/30"
								)}
							/>
						</div>
						{errors.password?.message && (
							<p className="text-sm text-destructive flex items-center gap-1.5">
								<span className="inline-block w-1 h-1 rounded-full bg-destructive" />
								{translateError(errors.password.message)}
							</p>
						)}
					</div>

					{/* Confirm Password Field */}
					<div className="grid gap-2">
						<Label htmlFor="confirmPassword" className="text-sm font-medium">
							{t("auth.fields.confirm_password")}
						</Label>
						<div className="relative">
							<ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								id="confirmPassword"
								placeholder={t("auth.placeholders.password")}
								type="password"
								autoComplete="new-password"
								disabled={isLoading}
								{...register("confirmPassword")}
								className={cn(
									"pl-10 h-12 bg-muted/30 border-border/50 focus:bg-background transition-colors",
									errors.confirmPassword &&
										"border-destructive focus-visible:ring-destructive/30"
								)}
							/>
						</div>
						{errors.confirmPassword?.message && (
							<p className="text-sm text-destructive flex items-center gap-1.5">
								<span className="inline-block w-1 h-1 rounded-full bg-destructive" />
								{translateError(errors.confirmPassword.message)}
							</p>
						)}
					</div>

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
