import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout";
import { sessionQueryOptions } from "@/features/auth/queries/auth-queries";

export const Route = createFileRoute("/_layout")({
	beforeLoad: async ({ context: { queryClient } }) => {
		const session = await queryClient.ensureQueryData(sessionQueryOptions);
		if (!session) {
			throw redirect({
				to: "/login",
			});
		}
	},
	component: AppLayout,
});
