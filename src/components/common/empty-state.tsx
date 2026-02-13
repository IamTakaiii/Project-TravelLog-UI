import { motion } from "framer-motion";

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scaleIn } from "@/common/animations";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
	icon: LucideIcon;
	title: string;
	description: string;
	actionLabel?: string;
	onAction?: () => void;
	className?: string;
	animate?: boolean;
}

export function EmptyState({
	icon: Icon,
	title,
	description,
	actionLabel,
	onAction,
	className,
	animate = true,
}: EmptyStateProps) {
	const content = (
		<div
			className={cn(
				"flex flex-col items-center justify-center p-12 text-center space-y-4 rounded-3xl border border-dashed border-border bg-muted/20",
				className
			)}
		>
			<div className="relative">
				<div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
				<div className="relative bg-background p-4 rounded-full shadow-sm">
					<Icon className="size-8 text-muted-foreground/50" />
				</div>
			</div>
			<div className="space-y-1">
				<h3 className="text-lg font-semibold text-foreground">{title}</h3>
				<p className="text-muted-foreground max-w-md mx-auto">{description}</p>
			</div>
			{actionLabel && onAction && (
				<Button className="rounded-full mt-2" onClick={onAction}>
					{actionLabel}
				</Button>
			)}
		</div>
	);

	if (!animate) return content;

	return (
		<motion.div variants={scaleIn} initial="hidden" animate="show">
			{content}
		</motion.div>
	);
}
