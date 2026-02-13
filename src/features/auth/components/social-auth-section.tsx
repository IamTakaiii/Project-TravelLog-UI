import { Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface SocialAuthSectionProps {
	isLoading: boolean;
	onSocialSignIn: (provider: "github" | "google") => void;
}

export function SocialAuthSection({
	isLoading,
	onSocialSignIn,
}: SocialAuthSectionProps) {
	const { t } = useTranslation();

	return (
		<div className="space-y-6">
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

			{/* Social Login Buttons */}
			<Button
				variant="outline"
				type="button"
				disabled={isLoading}
				onClick={() => onSocialSignIn("github")}
				className="w-full h-12 border-border hover:bg-muted/50 transition-colors text-foreground"
			>
				{isLoading ? (
					<Loader2 className="mr-2 h-5 w-5 animate-spin" />
				) : (
					<Github className="mr-2 h-5 w-5 text-foreground" />
				)}
				{t("auth.social.github")}
			</Button>
		</div>
	);
}
