import { Sheet, SheetContent } from "@/components/ui/sheet";
import { formatMoney } from "../utils/money-formatter";
import { DebtBreakdown } from "../hooks/use-debt-calculator";
import { ExpenseCard } from "./expense-card";
import {
	CheckCircle2,
	Receipt,
	ArrowDownLeft,
	ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { DetailSheetHero } from "./detail-sheet-hero";
import { CurrencyCode } from "../types";

interface DebtDetailSheetProps {
	debt: DebtBreakdown | null;
	type: "pay" | "receive";
	onClose: () => void;
	onSettle: () => void;
	userMap: Map<string, string>;
	currentUserId: string;
	tripCurrency?: CurrencyCode;
}

export function DebtDetailSheet({
	debt,
	type,
	onClose,
	onSettle,
	userMap,
	currentUserId,
	tripCurrency = "THB",
}: DebtDetailSheetProps) {
	if (!debt) return null;

	const isPay = type === "pay";
	const userName = userMap.get(debt.userId) || debt.userId;

	const heroColorClass = isPay
		? "bg-gradient-to-br from-destructive/5 via-destructive/10 to-orange-500/5"
		: "bg-gradient-to-br from-emerald-500/5 via-emerald-500/10 to-teal-500/5";

	const badgeClassName = isPay ? "bg-destructive" : "bg-emerald-500";
	const amountClassName = isPay ? "text-destructive" : "text-emerald-600";
	const buttonClassName = isPay
		? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
		: "bg-emerald-600 hover:bg-emerald-700 text-white";

	return (
		<Sheet open={!!debt} onOpenChange={onClose}>
			<SheetContent className="w-full sm:max-w-md p-0 overflow-y-auto border-l border-border/50">
				<DetailSheetHero colorClass={heroColorClass}>
					<div className="relative mb-4">
						<div className="size-20 rounded-3xl bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-border/50 text-2xl font-black text-foreground">
							{userName.slice(0, 2).toUpperCase()}
						</div>
						<div
							className={cn(
								"absolute -bottom-1.5 -right-1.5 p-1.5 rounded-full border-2 border-background",
								badgeClassName
							)}
						>
							{isPay ? (
								<ArrowUpRight className="size-3 text-white" />
							) : (
								<ArrowDownLeft className="size-3 text-white" />
							)}
						</div>
					</div>

					<h2 className="text-base font-semibold text-muted-foreground">
						{isPay ? `You owe ${userName}` : `${userName} owes you`}
					</h2>

					<span
						className={cn(
							"text-4xl sm:text-5xl font-black font-mono tracking-tighter mt-2",
							amountClassName
						)}
					>
						{isPay ? "-" : "+"}
						{formatMoney(Math.abs(debt.amount), tripCurrency)}
					</span>

					<Button
						onClick={onSettle}
						size="lg"
						className={cn(
							"mt-6 rounded-full font-bold shadow-lg gap-2 active:scale-95 transition-all px-8",
							buttonClassName
						)}
					>
						<CheckCircle2 className="size-4" />
						Mark as Settled
					</Button>
				</DetailSheetHero>

				<div className="px-6 -mt-6 relative z-10 space-y-6 pb-10">
					<div className="bg-card rounded-3xl p-5 sm:p-6 shadow-xl border border-border/50">
						<div className="flex items-center justify-between mb-5">
							<div className="flex items-center gap-2">
								<div className="p-2 rounded-xl bg-muted/60">
									<Receipt className="size-4 text-muted-foreground" />
								</div>
								<h3 className="text-sm font-bold text-foreground">
									Contributing Expenses
								</h3>
							</div>
							<span className="text-xs font-semibold text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">
								{debt.transactions.length}
							</span>
						</div>

						<div className="space-y-3">
							{debt.transactions.map((ex, i) => {
								const splitters = ex.splitDetails.involvedUserIds;
								const targetUserId = isPay ? ex.payerId : currentUserId;

								let share = ex.thbAmount / splitters.length;
								let originalShare = ex.amount / splitters.length;

								if (
									ex.splitDetails.type === "exact" &&
									ex.splitDetails.amounts
								) {
									share = ex.splitDetails.amounts[targetUserId] || 0;
									originalShare = ex.splitDetails.amounts[targetUserId] || 0;
									share = originalShare * ex.exchangeRate;
								}

								return (
									<motion.div
										key={ex.id}
										initial={{ opacity: 0, y: 8 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: i * 0.05 }}
									>
										<ExpenseCard
											expense={ex}
											onClick={() => {}}
											userMap={userMap}
											overrideAmount={share}
											overrideSubAmount={originalShare}
											tripCurrency={tripCurrency}
										/>
									</motion.div>
								);
							})}
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
