import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { scaleIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
	title?: string;
	description?: string;
	onRetry?: () => void;
	className?: string;
}

export function ErrorState({
	title = "Something went wrong",
	description = "We couldn't load the data. Please try again or contact support if the problem persists.",
	onRetry,
	className,
}: ErrorStateProps) {
	return (
		<motion.div
			variants={scaleIn}
			initial="hidden"
			animate="show"
			className={cn(
				"flex flex-col items-center justify-center p-12 text-center space-y-4 rounded-3xl border border-destructive/20 bg-destructive/5",
				className
			)}
		>
			<div className="relative">
				<div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl animate-pulse" />
				<div className="relative bg-background p-4 rounded-full shadow-sm">
					<AlertCircle className="size-8 text-destructive/70" />
				</div>
			</div>
			<div className="space-y-1">
				<h3 className="text-lg font-semibold text-foreground">{title}</h3>
				<p className="text-muted-foreground max-w-md mx-auto">{description}</p>
			</div>
			{onRetry && (
				<Button
					variant="outline"
					className="rounded-full mt-2 gap-2 border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
					onClick={onRetry}
				>
					<RefreshCw className="size-4" />
					Try Again
				</Button>
			)}
		</motion.div>
	);
}
