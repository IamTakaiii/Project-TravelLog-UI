import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModernCardProps {
	children: ReactNode;
	className?: string;
	glass?: boolean;
	onClick?: () => void;
}

export function ModernCard({
	children,
	className,
	glass = true,
	onClick,
}: ModernCardProps) {
	return (
		<div
			onClick={onClick}
			className={cn(
				"rounded-3xl border border-border/50 p-6 shadow-sm",
				glass ? "bg-card/50 backdrop-blur-xl" : "bg-card",
				className
			)}
		>
			{children}
		</div>
	);
}
