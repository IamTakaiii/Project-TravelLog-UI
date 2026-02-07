import { DollarSign, AlertCircle, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatMoney } from "../utils/money-utils";

interface BudgetOverviewProps {
	totalBudget: number;
	totalSpent: number;
	currency?: string;
}

export function BudgetOverview({
	totalBudget,
	totalSpent,
	currency = "THB",
}: BudgetOverviewProps) {
	const percentage =
		totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;
	const remaining = totalBudget - totalSpent;

	let statusColor = "bg-primary";
	let bgColor = "bg-primary/10";

	if (percentage > 75) {
		statusColor = "bg-yellow-500";
		bgColor = "bg-yellow-500/10";
	}
	if (percentage > 90) {
		statusColor = "bg-destructive";
		bgColor = "bg-destructive/10";
	}

	return (
		<div className="bg-card/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-border/50 p-3 sm:p-4 lg:p-6 shadow-sm h-full flex flex-col justify-between space-y-3 sm:space-y-4 lg:space-y-6 w-full overflow-hidden">
			<div className="flex justify-between items-start gap-2 sm:gap-3 min-w-0">
				<div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
					<h3 className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
						Current Spending
					</h3>
					<div className="flex flex-col gap-0.5">
						<span className="text-xl sm:text-2xl lg:text-3xl font-[800] tracking-tighter text-foreground truncate">
							{formatMoney(totalSpent, currency as any)}
						</span>
						<span className="text-[11px] sm:text-xs text-muted-foreground font-medium truncate">
							/ {formatMoney(totalBudget, currency as any)}
						</span>
					</div>
				</div>
				<div
					className={`p-2 sm:p-2.5 lg:p-3 rounded-xl sm:rounded-2xl ${bgColor} transition-colors duration-500 shrink-0`}
				>
					<DollarSign
						className={`size-4 sm:size-5 lg:size-6 ${statusColor.replace("bg-", "text-")}`}
					/>
				</div>
			</div>

			<div className="space-y-2 sm:space-y-3 min-w-0">
				<div className="space-y-1.5 sm:space-y-2">
					<div className="flex justify-between items-end gap-2 flex-wrap">
						<div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold text-foreground">
							<TrendingUp className="size-3 sm:size-3.5 text-emerald-500 shrink-0" />
							<span className="whitespace-nowrap">
								{percentage.toFixed(0)}% Used
							</span>
						</div>
						{percentage >= 90 && (
							<div className="text-[8px] sm:text-[9px] font-black text-destructive uppercase flex items-center gap-1 animate-pulse bg-destructive/10 px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap">
								<AlertCircle className="size-2.5 sm:size-3 shrink-0" /> Alert
							</div>
						)}
					</div>
					<Progress
						value={percentage}
						className="h-1.5 sm:h-2 bg-muted/50 border border-border/20"
						indicatorClassName={`${statusColor} shadow-[0_0_15px_rgba(var(--primary),0.5)]`}
					/>
				</div>

				<div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3 pt-1 sm:pt-2">
					<div className="bg-background/50 rounded-xl p-2 sm:p-2.5 border border-border/50 min-w-0">
						<p className="text-[8px] sm:text-[9px] font-bold text-muted-foreground uppercase mb-0.5 sm:mb-1">
							Remaining
						</p>
						<p
							className={`text-xs sm:text-sm lg:text-base font-bold truncate ${remaining < 0 ? "text-destructive" : "text-emerald-500"}`}
						>
							{formatMoney(remaining, currency as any)}
						</p>
					</div>
					<div className="bg-background/50 rounded-xl p-2 sm:p-2.5 border border-border/50 min-w-0">
						<p className="text-[8px] sm:text-[9px] font-bold text-muted-foreground uppercase mb-0.5 sm:mb-1">
							Daily Avg
						</p>
						<p className="text-xs sm:text-sm lg:text-base font-bold text-foreground truncate">
							{formatMoney(totalSpent / 3, currency as any)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
