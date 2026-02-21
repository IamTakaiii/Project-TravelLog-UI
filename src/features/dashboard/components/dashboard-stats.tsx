import { Plane, Globe, Luggage, Users } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { StatCard } from "@/components/common/stat-card";
import { StatCardSkeleton } from "@/components/common/skeletons";

interface DashboardStatsProps {
	isLoading?: boolean;
}

export function DashboardStats({ isLoading }: DashboardStatsProps) {
	if (isLoading) {
		return (
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
				{[...Array(4)].map((_, i) => (
					<StatCardSkeleton key={i} />
				))}
			</div>
		);
	}

	return (
		<motion.section
			variants={staggerContainer}
			initial="hidden"
			animate="show"
			className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
		>
			<StatCard
				title="Total Trips"
				value="12"
				trend="+2 this year"
				icon={Plane}
				colorClassName="text-sky-500"
				bgColorClassName="bg-sky-500/10"
			/>
			<StatCard
				title="Countries"
				value="08"
				trend="World Explorer"
				icon={Globe}
				colorClassName="text-emerald-500"
				bgColorClassName="bg-emerald-500/10"
			/>
			<StatCard
				title="Journal"
				value="24"
				trend="Memories kept"
				icon={Luggage}
				colorClassName="text-amber-500"
				bgColorClassName="bg-amber-500/10"
			/>
			<StatCard
				title="Buddies"
				value="16"
				trend="Active friends"
				icon={Users}
				colorClassName="text-rose-500"
				bgColorClassName="bg-rose-500/10"
			/>
		</motion.section>
	);
}
