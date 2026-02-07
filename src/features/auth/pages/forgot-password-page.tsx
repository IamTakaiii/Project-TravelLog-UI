import { useTranslation } from "react-i18next";
import { KeyRound } from "lucide-react";
import { AuthLayout } from "../components/auth-layout";
import { AuthPageHeader } from "../components/auth-page-header";
import { ForgotPasswordForm } from "../components/forgot-password-form";

export default function ForgotPasswordPage() {
	const { t } = useTranslation();

	return (
		<AuthLayout>
			<AuthPageHeader
				badge={{
					icon: KeyRound,
					text: "Password Recovery",
					variant: "muted",
				}}
				title={t("auth.forgot_password.title")}
				description={t("auth.forgot_password.description")}
			/>
			<ForgotPasswordForm />
		</AuthLayout>
	);
}
