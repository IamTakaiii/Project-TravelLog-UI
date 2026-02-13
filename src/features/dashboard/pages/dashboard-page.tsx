import { authClient } from "@/lib/auth-client";
import { DashboardHeader } from "../components/dashboard-header";
import { DashboardStats } from "../components/dashboard-stats";
import { DashboardRecentTrips } from "../components/dashboard-recent-trips";
import { DashboardQuickActions } from "../components/dashboard-quick-actions";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/common/animations";

export function DashboardPage() {
	const session = authClient.useSession();
	const user = session.data?.user;

	return (
		<motion.div
			variants={staggerContainer}
			initial="hidden"
			animate="show"
			className="min-h-screen bg-background p-6 lg:p-10 space-y-10"
		>
			{/* 1. Hero Section */}
			<motion.div variants={fadeInUp}>
				<DashboardHeader user={user} />
			</motion.div>

			{/* 2. Stats Section */}
			<motion.div variants={fadeInUp}>
				<DashboardStats />
			</motion.div>

			{/* 3. Main Content: Split Layout */}
			<motion.section variants={fadeInUp} className="grid lg:grid-cols-3 gap-8">
				{/* Left Column: Recent Trips (Wider) */}
				<DashboardRecentTrips />
				{/* Right Column: Quick Actions & Calendar (Narrower) */}
				<DashboardQuickActions />
			</motion.section>
		</motion.div>
	);
}

