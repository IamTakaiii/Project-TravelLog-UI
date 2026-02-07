import { Plane, Globe, Luggage, Users, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, type Variants } from "framer-motion";

interface StatsCardProps {
	title: string;
	value: string;
	trend?: string;
	icon: LucideIcon;
	color: string;
	bgColor: string;
}

const item: Variants = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 50,
		},
	},
};

function ModernStatsCard({
	title,
	value,
	trend,
	icon: Icon,
	color,
	bgColor,
}: StatsCardProps) {
	return (
		<motion.div variants={item}>
			<Card className="border-border/40 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 bg-background/60 backdrop-blur-sm group cursor-default h-full">
				<CardContent className="p-6">
					<div className="flex justify-between items-start mb-4">
						<div
							className={`p-3 rounded-2xl ${bgColor} ${color} group-hover:scale-110 transition-transform`}
						>
							<Icon className="size-6" />
						</div>
						{trend && (
							<span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-full">
								{trend}
							</span>
						)}
					</div>
					<div>
						<div className="text-3xl font-[800] tracking-tight mb-1 group-hover:text-primary transition-colors">
							{value}
						</div>
						<div className="text-sm font-medium text-muted-foreground">
							{title}
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2, // Delay stats slightly
		},
	},
};

export function DashboardStats() {
	return (
		<motion.section
			variants={container}
			initial="hidden"
			animate="show"
			className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
		>
			<ModernStatsCard
				title="Total Trips"
				value="12"
				trend="+2 this year"
				icon={Plane}
				color="text-sky-500"
				bgColor="bg-sky-500/10"
			/>
			<ModernStatsCard
				title="Countries"
				value="08"
				trend="World Explorer"
				icon={Globe}
				color="text-emerald-500"
				bgColor="bg-emerald-500/10"
			/>
			<ModernStatsCard
				title="Journal"
				value="24"
				trend="Memories kept"
				icon={Luggage}
				color="text-amber-500"
				bgColor="bg-amber-500/10"
			/>
			<ModernStatsCard
				title="Buddies"
				value="16"
				trend="Active friends"
				icon={Users}
				color="text-rose-500"
				bgColor="bg-rose-500/10"
			/>
		</motion.section>
	);
}
