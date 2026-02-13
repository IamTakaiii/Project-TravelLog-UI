import { Wallet, TrendingUp, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatMoney } from "../utils/money-formatter";
import { BUDGET_WARNING_PERCENT, BUDGET_CRITICAL_PERCENT } from "../constants/thresholds";
import { CurrencyCode } from "../types";
import { ModernCard } from "@/components/common/modern-card";

interface BudgetSummaryCardProps {
	totalSpent: number;
	totalBudget: number;
	remaining: number;
	percentage: number;
	dailyAverage: number;
	currency: CurrencyCode;
}

export function BudgetSummaryCard({
	totalSpent,
	totalBudget,
	remaining,
	percentage,
	dailyAverage,
	currency,
}: BudgetSummaryCardProps) {
	let statusColor = "bg-primary";
	let bgColor = "bg-primary/10";

	if (percentage >= BUDGET_WARNING_PERCENT) {
		statusColor = "bg-yellow-500";
		bgColor = "bg-yellow-500/10";
	}
	if (percentage >= BUDGET_CRITICAL_PERCENT) {
		statusColor = "bg-destructive";
		bgColor = "bg-destructive/10";
	}

	return (
		<ModernCard className="space-y-6">
			<div className="flex justify-between items-start gap-3">
				<div className="space-y-1 flex-1 min-w-0">
					<h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
						Current Spending
					</h3>
					<div className="flex flex-col gap-0.5">
						<span className="text-3xl font-[800] tracking-tighter text-foreground truncate">
							{formatMoney(totalSpent, currency)}
						</span>
						<span className="text-sm text-muted-foreground font-medium truncate">
							of {formatMoney(totalBudget, currency)}
						</span>
					</div>
				</div>
				<div
					className={`p-3 rounded-2xl ${bgColor} transition-colors duration-500 shrink-0`}
				>
					<Wallet
						className={`size-6 ${statusColor.replace("bg-", "text-")}`}
					/>
				</div>
			</div>

			<div className="space-y-3">
				<div className="space-y-2">
					<div className="flex justify-between items-end gap-2 flex-wrap">
						<div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
							<TrendingUp className="size-3.5 text-emerald-500 shrink-0" />
							<span className="whitespace-nowrap">
								{percentage.toFixed(0)}% Used
							</span>
						</div>
						{percentage >= BUDGET_CRITICAL_PERCENT && (
							<div className="text-[9px] font-black text-destructive uppercase flex items-center gap-1 animate-pulse bg-destructive/10 px-2 py-0.5 rounded-full whitespace-nowrap">
								<AlertCircle className="size-3 shrink-0" /> Alert
							</div>
						)}
					</div>
					<Progress
						value={percentage}
						className="h-2 bg-muted/50 border border-border/20"
						indicatorClassName={statusColor}
					/>
				</div>

				<div className="grid grid-cols-2 gap-3 pt-2">
					<div className="bg-background/50 rounded-xl p-3 border border-border/50 min-w-0">
						<p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">
							Remaining
						</p>
						<p
							className={`text-base font-bold truncate ${remaining < 0 ? "text-destructive" : "text-emerald-500"}`}
						>
							{formatMoney(remaining, currency)}
						</p>
					</div>
					<div className="bg-background/50 rounded-xl p-3 border border-border/50 min-w-0">
						<p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">
							Daily Avg
						</p>
						<p className="text-base font-bold text-foreground truncate">
							{formatMoney(dailyAverage, currency)}
						</p>
					</div>
				</div>
			</div>
		</ModernCard>
	);
}

