import { authClient } from "@/lib/auth-client";
import { DashboardHeader } from "../components/dashboard-header";
import { DashboardStats } from "../components/dashboard-stats";
import { DashboardRecentTrips } from "../components/dashboard-recent-trips";
import { DashboardQuickActions } from "../components/dashboard-quick-actions";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { FeaturePageLayout } from "@/components/common/feature-page-layout";
import { useQuery } from "@tanstack/react-query";
import { tripsQueryOptions } from "@/features/trips/queries/trips-queries";

export function DashboardPage() {
	const session = authClient.useSession();
	const user = session.data?.user;
	const { isLoading } = useQuery(tripsQueryOptions);

	return (
		<FeaturePageLayout>
			{/* 1. Hero Section */}
			<motion.div variants={fadeInUp}>
				<DashboardHeader user={user} />
			</motion.div>

			{/* 2. Stats Section */}
			<motion.div variants={fadeInUp}>
				<DashboardStats isLoading={isLoading} />
			</motion.div>

			{/* 3. Main Content: Split Layout */}
			<motion.section variants={fadeInUp} className="grid lg:grid-cols-3 gap-8">
				<DashboardRecentTrips />
				<DashboardQuickActions />
			</motion.section>
		</FeaturePageLayout>
	);
}



