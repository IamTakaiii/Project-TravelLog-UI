import { motion } from "framer-motion";
import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { itemVariants } from "../constants";

export function CompanionsCard() {
	return (
		<motion.div
			variants={itemVariants}
			className="bg-card rounded-3xl p-6 border border-border shadow-sm space-y-4"
		>
			<h3 className="font-semibold flex items-center gap-2">
				<Users className="size-4 text-primary" />
				Companions
			</h3>
			<div className="flex flex-wrap gap-2">
				<div className="flex items-center gap-3 p-2 pr-4 rounded-full bg-muted/50 border border-border/50">
					<div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
						ME
					</div>
					<span className="text-sm font-medium">You</span>
				</div>
				<Button
					variant="outline"
					size="sm"
					className="rounded-full h-12 px-4 border-dashed border-2"
				>
					<Plus className="size-4 mr-2" />
					Invite
				</Button>
			</div>
		</motion.div>
	);
}
