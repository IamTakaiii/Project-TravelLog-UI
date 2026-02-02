import { useTranslation } from "react-i18next";
import { AuthLayout } from "../components/auth-layout";
import { AuthPageHeader } from "../components/auth-page-header";
import { LoginForm } from "../components/login-form";

export default function LoginPage() {
	const { t } = useTranslation();

	return (
		<AuthLayout>
			<AuthPageHeader
				badge={{
					text: "Welcome back",
					variant: "primary",
					animated: true,
				}}
				title={t("auth.login.title")}
				description={t("auth.login.description")}
			/>
			<LoginForm />
		</AuthLayout>
	);
}
