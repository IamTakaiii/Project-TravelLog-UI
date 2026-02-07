import { Link } from "@tanstack/react-router";
import { ArrowLeft, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface MoneyHeaderProps {
	tripId: string;
	tripTitle: string;
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
};

export function MoneyHeader({ tripId, tripTitle }: MoneyHeaderProps) {
	return (
		<motion.div variants={itemVariants}>
			{/* Back Button */}
			<Link to={`/trips/${tripId}` as any}>
				<Button
					variant="ghost"
					size="sm"
					className="mb-4 -ml-2 gap-2 text-muted-foreground hover:text-foreground"
				>
					<ArrowLeft className="size-4" />
					Back to Trip
				</Button>
			</Link>

			{/* Badge */}
			<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider mb-4">
				<Wallet className="size-3" />
				Money Management
			</div>

			{/* Title */}
			<div className="mb-2">
				<h1 className="text-4xl md:text-5xl font-[800] tracking-tight text-foreground">
					Budget & Expenses
				</h1>
			</div>

			<p className="text-lg text-muted-foreground max-w-2xl">
				Track spending, split expenses, and manage your budget for{" "}
				<span className="font-semibold text-foreground">{tripTitle}</span>
			</p>
		</motion.div>
	);
}
