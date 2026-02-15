import { Sheet, SheetContent } from "@/components/ui/sheet";
import { formatMoney } from "../utils/money-formatter";
import { DebtBreakdown } from "../hooks/use-debt-calculator";
import { ExpenseCard } from "./expense-card";
import { CheckCircle2, Receipt, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface DebtDetailSheetProps {
	debt: DebtBreakdown | null;
	type: "pay" | "receive";
	onClose: () => void;
	onSettle: () => void;
}

export function DebtDetailSheet({
	debt,
	type,
	onClose,
	onSettle,
}: DebtDetailSheetProps) {
	if (!debt) return null;

	const isPay = type === "pay";

	return (
		<Sheet open={!!debt} onOpenChange={onClose}>
			<SheetContent className="w-full sm:max-w-md p-0 overflow-y-auto border-l border-border/50">
				{/* Hero Section */}
				<div
					className={cn(
						"relative p-8 pb-14 flex flex-col items-center justify-center text-center overflow-hidden",
						isPay
							? "bg-gradient-to-br from-destructive/5 via-destructive/10 to-orange-500/5"
							: "bg-gradient-to-br from-emerald-500/5 via-emerald-500/10 to-teal-500/5"
					)}
				>
					{/* Decorative blur */}
					<div
						className={cn(
							"absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] opacity-20 pointer-events-none",
							isPay ? "bg-destructive" : "bg-emerald-500"
						)}
					/>
					<div
						className={cn(
							"absolute bottom-0 left-0 w-32 h-32 rounded-full blur-[60px] opacity-15 pointer-events-none",
							isPay ? "bg-orange-500" : "bg-teal-500"
						)}
					/>

					{/* Avatar */}
					<div className="relative z-10 mb-4">
						<div className="size-20 rounded-3xl bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-border/50 text-2xl font-black text-foreground">
							{debt.userId.slice(0, 2).toUpperCase()}
						</div>
						<div
							className={cn(
								"absolute -bottom-1.5 -right-1.5 p-1.5 rounded-full border-2 border-background",
								isPay ? "bg-destructive" : "bg-emerald-500"
							)}
						>
							{isPay ? (
								<ArrowUpRight className="size-3 text-white" />
							) : (
								<ArrowDownLeft className="size-3 text-white" />
							)}
						</div>
					</div>

					{/* Title */}
					<h2 className="relative z-10 text-base font-semibold text-muted-foreground">
						{isPay ? `You owe ${debt.userId}` : `${debt.userId} owes you`}
					</h2>

					{/* Amount */}
					<span
						className={cn(
							"relative z-10 text-4xl sm:text-5xl font-black font-mono tracking-tighter mt-2",
							isPay ? "text-destructive" : "text-emerald-600"
						)}
					>
						{isPay ? "-" : "+"}
						{formatMoney(Math.abs(debt.amount), "THB")}
					</span>

					{/* Settle Button */}
					<Button
						onClick={onSettle}
						size="lg"
						className={cn(
							"relative z-10 mt-6 rounded-full font-bold shadow-lg gap-2 active:scale-95 transition-all px-8",
							isPay
								? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
								: "bg-emerald-600 hover:bg-emerald-700 text-white"
						)}
					>
						<CheckCircle2 className="size-4" />
						Mark as Settled
					</Button>
				</div>

				{/* Expense Details */}
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
							{debt.transactions.map((ex, i) => (
								<motion.div
									key={ex.id}
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: i * 0.05 }}
								>
									<ExpenseCard expense={ex} onClick={() => { }} />
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
