import { Plane, Globe, Luggage, Users, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
	title: string;
	value: string;
	trend?: string;
	icon: LucideIcon;
	color: string;
	bgColor: string;
}

function ModernStatsCard({
	title,
	value,
	trend,
	icon: Icon,
	color,
	bgColor,
}: StatsCardProps) {
	return (
		<Card className="border-border/40 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 bg-background/60 backdrop-blur-sm group cursor-default">
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
	);
}

export function DashboardStats() {
	return (
		<section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-in slide-in-from-bottom-8 duration-700 delay-500">
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
		</section>
	);
}
