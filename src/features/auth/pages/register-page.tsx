import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";
import { AuthLayout } from "../components/auth-layout";
import { AuthPageHeader } from "../components/auth-page-header";
import { RegisterForm } from "../components/register-form";

export default function RegisterPage() {
	const { t } = useTranslation();

	return (
		<AuthLayout>
			<AuthPageHeader
				badge={{
					icon: Sparkles,
					text: "Start your journey",
					variant: "accent",
				}}
				title={t("auth.register.title")}
				description={t("auth.register.description")}
			/>
			<RegisterForm />
		</AuthLayout>
	);
}
