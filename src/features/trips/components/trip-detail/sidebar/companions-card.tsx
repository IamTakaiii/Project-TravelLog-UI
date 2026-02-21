import { motion } from "framer-motion";
import { Users, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/animations";
import { useTripDetail } from "../trip-detail-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function CompanionsCard() {
	const { trip } = useTripDetail();
	const members = trip.members || [];

	return (
		<motion.div
			variants={fadeInUp}
			className="bg-card rounded-3xl p-6 border border-border shadow-sm space-y-4"
		>
			<div className="flex items-center justify-between">
				<h3 className="font-semibold flex items-center gap-2">
					<Users className="size-4 text-primary" />
					Companions
				</h3>
				<span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
					{members.length}
				</span>
			</div>

			<div className="flex flex-wrap gap-3">
				{members.map((member) => (
					<Tooltip key={member.userId}>
						<TooltipTrigger asChild>
							<div className="relative group">
								<Avatar className="size-10 border-2 border-background ring-2 ring-transparent group-hover:ring-primary/30 transition-all">
									<AvatarImage
										src={member.user.image || ""}
										alt={member.user.name}
									/>
									<AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
										{member.user.name.substring(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								{member.userId === trip.createdBy && (
									<div className="absolute -top-1 -right-1 bg-background rounded-full p-0.5 shadow-sm border border-border">
										<Star className="size-2.5 fill-amber-500 text-amber-500" />
									</div>
								)}
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p className="font-bold">{member.user.name}</p>
							<p className="text-[10px] uppercase tracking-wider opacity-70">
								{member.userId === trip.createdBy ? "Trip Creator" : "Member"}
							</p>
						</TooltipContent>
					</Tooltip>
				))}

				<Button
					variant="ghost"
					size="icon"
					className="size-10 rounded-full border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all"
				>
					<Plus className="size-4" />
				</Button>
			</div>

			<Button
				variant="outline"
				className="w-full rounded-xl h-11 text-xs font-bold border-dashed border-2"
			>
				Invite Buddies
			</Button>
		</motion.div>
	);
}
