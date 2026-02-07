import { Sheet, SheetContent } from "@/components/ui/sheet";
import { formatMoney } from "../utils/money-utils";
import { DebtBreakdown } from "../hooks/use-debt-calculator";
import { ExpenseCard } from "./expense-card";
import { CheckCircle2, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
	const color = isPay ? "text-destructive" : "text-emerald-600";
	const bgColor = isPay ? "bg-destructive/10" : "bg-emerald-500/10";

	return (
		<Sheet open={!!debt} onOpenChange={onClose}>
			<SheetContent className="w-full sm:max-w-md p-0 overflow-y-auto border-l border-border/50">
				<div
					className={cn(
						"p-8 pb-12 flex flex-col items-center justify-center text-center",
						bgColor
					)}
				>
					<div className="size-20 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm text-2xl font-black">
						{debt.userId.slice(0, 2).toUpperCase()}
					</div>
					<h2 className="text-xl font-bold text-foreground opacity-80">
						{isPay ? `You owe ${debt.userId}` : `${debt.userId} owes you`}
					</h2>
					<span
						className={cn(
							"text-5xl font-black font-mono tracking-tighter mt-2",
							color
						)}
					>
						{formatMoney(Math.abs(debt.amount))}
					</span>

					<Button
						onClick={onSettle}
						className={cn(
							"mt-6 rounded-full font-bold shadow-lg gap-2 active:scale-95 transition-all",
							isPay
								? "bg-destructive hover:bg-destructive/90"
								: "bg-emerald-600 hover:bg-emerald-700"
						)}
					>
						<CheckCircle2 className="size-4" />
						Mark as Settled
					</Button>
				</div>

				<div className="px-6 -mt-6 relative z-10 space-y-6 pb-10">
					<div className="bg-card rounded-3xl p-6 shadow-xl border border-border/50">
						<div className="flex items-center gap-2 mb-4">
							<Receipt className="size-4 text-muted-foreground" />
							<h3 className="text-sm font-black uppercase tracking-wider text-muted-foreground">
								Contributing Expenses
							</h3>
						</div>

						<div className="space-y-3">
							{debt.transactions.map((ex) => (
								<ExpenseCard key={ex.id} expense={ex} onClick={() => {}} />
							))}
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
