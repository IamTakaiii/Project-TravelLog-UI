import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface StatCardProps {
	title: string;
	value: string | number;
	trend?: string;
	icon: LucideIcon;
	colorClassName?: string;
	bgColorClassName?: string;
	className?: string;
	variant?: "default" | "centered";
}

export function StatCard({
	title,
	value,
	trend,
	icon: Icon,
	colorClassName = "text-primary",
	bgColorClassName = "bg-primary/10",
	className,
	variant = "default",
}: StatCardProps) {
	const content = (
		<Card
			className={cn(
				"border-border/40 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 bg-background/60 backdrop-blur-sm group cursor-default h-full overflow-hidden",
				className
			)}
		>
			<CardContent
				className={cn(
					"p-6",
					variant === "centered" && "flex flex-col items-center text-center"
				)}
			>
				<div
					className={cn(
						"flex justify-between items-start mb-4 w-full",
						variant === "centered" && "justify-center"
					)}
				>
					<div
						className={cn(
							"p-3 rounded-2xl transition-transform group-hover:scale-110",
							bgColorClassName,
							colorClassName
						)}
					>
						<Icon className="size-6" />
					</div>
					{trend && variant === "default" && (
						<span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded-full">
							{trend}
						</span>
					)}
				</div>
				<div className={cn("space-y-1", variant === "centered" && "mt-2")}>
					{variant === "centered" && (
						<span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
							{title}
						</span>
					)}
					<div className="text-3xl font-[800] tracking-tight group-hover:text-primary transition-colors">
						{value}
					</div>
					{variant === "default" && (
						<div className="text-sm font-medium text-muted-foreground">
							{title}
						</div>
					)}
					{variant === "centered" && trend && (
						<div className="text-[10px] font-bold text-muted-foreground uppercase mt-1">
							{trend}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);

	return <motion.div variants={fadeInUp}>{content}</motion.div>;
}
