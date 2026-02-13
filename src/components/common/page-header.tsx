import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
	badge?: {
		icon?: LucideIcon;
		text: string;
		className?: string;
		animated?: boolean;
	};
	title: ReactNode;
	description?: ReactNode;
	actions?: ReactNode;
	className?: string;
	backButton?: ReactNode;
}

export function PageHeader({
	badge,
	title,
	description,
	actions,
	className,
	backButton,
}: PageHeaderProps) {
	return (
		<motion.div variants={fadeInUp} className={cn("space-y-4", className)}>
			{backButton}

			{badge && (
				<div
					className={cn(
						"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider",
						badge.className
					)}
				>
					{badge.animated && (
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
							<span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
						</span>
					)}
					{badge.icon && <badge.icon className="size-3" />}
					{badge.text}
				</div>
			)}

			<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
				<div className="space-y-2 max-w-3xl">
					<h1 className="text-4xl md:text-5xl font-[800] tracking-tight text-foreground leading-tight">
						{title}
					</h1>
					{description && (
						<div className="text-lg text-muted-foreground font-light leading-relaxed">
							{description}
						</div>
					)}
				</div>
				{actions && <div className="shrink-0">{actions}</div>}
			</div>
		</motion.div>
	);
}
