import { ReactNode } from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface FeaturePageLayoutProps {
	children: ReactNode;
	className?: string;
	maxWidth?: "4xl" | "7xl" | "none";
}

export function FeaturePageLayout({
	children,
	className,
	maxWidth = "7xl",
}: FeaturePageLayoutProps) {
	const maxWidthClasses = {
		"4xl": "max-w-4xl",
		"7xl": "max-w-7xl",
		none: "max-w-none",
	};

	return (
		<motion.div
			initial="hidden"
			animate="show"
			variants={staggerContainer}
			className={cn("min-h-screen bg-background p-6 lg:p-10 relative overflow-hidden", className)}
		>
			{/* Shared Decorative Background */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
				<div className="absolute top-20 right-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
				<div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] animate-pulse delay-1000" />
			</div>

			<div className={cn("mx-auto space-y-10 relative z-10", maxWidthClasses[maxWidth])}>
				{children}
			</div>
		</motion.div>
	);
}
