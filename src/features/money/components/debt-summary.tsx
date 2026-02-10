import { useState, memo } from "react";
import { useDebtCalculator, DebtBreakdown } from "../hooks/use-debt-calculator";
import { Expense } from "../types";
import { formatMoney } from "../services/money-formatter";
import { ArrowRightLeft, Wallet, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { DebtDetailSheet } from "./debt-detail-sheet";

interface DebtSummaryProps {
	expenses: Expense[];
	currentUserId: string;
}

export function DebtSummary({ expenses, currentUserId }: DebtSummaryProps) {
	const { whoOwesMe, iOweWho, totalReceivable, totalPayable } =
		useDebtCalculator(expenses, currentUserId);
	const [selectedDebt, setSelectedDebt] = useState<{
		item: DebtBreakdown;
		type: "pay" | "receive";
	} | null>(null);

	if (whoOwesMe.length === 0 && iOweWho.length === 0) {
		return (
			<div className="text-center py-12 sm:py-20 text-muted-foreground bg-card/50 backdrop-blur-sm rounded-[2.5rem] border border-dashed border-border flex flex-col items-center space-y-4 mx-auto max-w-md">
				<div className="bg-muted p-6 rounded-full">
					<Wallet className="size-10 text-muted-foreground/30" />
				</div>
				<div className="space-y-1">
					<p className="font-bold text-foreground">No debts settled yet</p>
					<p className="text-sm opacity-70">Everything is clear! 🎉</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8 sm:space-y-10">
			{/* Net Position Cards */}
			<div className="grid grid-cols-2 gap-3 sm:gap-4">
				<div className="bg-emerald-500/10 p-4 sm:p-5 rounded-3xl border border-emerald-500/20">
					<p className="text-[10px] font-black uppercase tracking-wider text-emerald-600 mb-1">
						To Receive
					</p>
					<p className="text-xl sm:text-2xl font-black text-emerald-600 truncate">
						{formatMoney(totalReceivable, "THB")}
					</p>
				</div>
				<div className="bg-destructive/10 p-4 sm:p-5 rounded-3xl border border-destructive/20">
					<p className="text-[10px] font-black uppercase tracking-wider text-destructive mb-1">
						To Pay
					</p>
					<p className="text-xl sm:text-2xl font-black text-destructive truncate">
						{formatMoney(totalPayable, "THB")}
					</p>
				</div>
			</div>

			{/* Who Owes Me */}
			{whoOwesMe.length > 0 && (
				<div className="space-y-3 sm:space-y-4">
					<div className="flex items-center gap-2 px-2">
						<div className="p-2 rounded-lg bg-emerald-500/10">
							<ArrowRightLeft className="size-4 text-emerald-600" />
						</div>
						<h3 className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em]">
							Friends Owe You
						</h3>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
						{whoOwesMe.map((item) => (
							<DebtCard
								key={item.userId}
								userId={item.userId}
								amount={item.amount}
								type="receive"
								onClick={() => setSelectedDebt({ item, type: "receive" })}
							/>
						))}
					</div>
				</div>
			)}

			{/* I Owe Who */}
			{iOweWho.length > 0 && (
				<div className="space-y-3 sm:space-y-4">
					<div className="flex items-center gap-2 px-2">
						<div className="p-2 rounded-lg bg-destructive/10">
							<Wallet className="size-4 text-destructive" />
						</div>
						<h3 className="text-xs font-bold text-destructive uppercase tracking-[0.2em]">
							You Owe Friends
						</h3>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
						{iOweWho.map((item) => (
							<DebtCard
								key={item.userId}
								userId={item.userId}
								amount={Math.abs(item.amount)}
								type="pay"
								onClick={() => setSelectedDebt({ item, type: "pay" })}
							/>
						))}
					</div>
				</div>
			)}

			<DebtDetailSheet
				debt={selectedDebt?.item || null}
				type={selectedDebt?.type || "pay"}
				onClose={() => setSelectedDebt(null)}
				onSettle={() => setSelectedDebt(null)}
			/>
		</div>
	);
}

const DebtCard = memo(function DebtCard({
	userId,
	amount,
	type,
	onClick,
}: {
	userId: string;
	amount: number;
	type: "pay" | "receive";
	onClick: () => void;
}) {
	const isPay = type === "pay";

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			whileHover={{ y: -2, transition: { duration: 0.2 } }}
			whileTap={{ scale: 0.98 }}
			onClick={onClick}
			className={`flex items-center justify-between p-4 sm:p-6 rounded-[2rem] border border-border/50 shadow-sm bg-card/50 backdrop-blur-xl hover:border-primary/30 transition-colors cursor-pointer relative overflow-hidden`}
		>
			<div className="flex items-center gap-3 sm:gap-4 relative z-10 overflow-hidden">
				<div
					className={`size-12 sm:size-14 rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm ring-4 ring-background shrink-0 ${isPay ? "bg-destructive/10 text-destructive" : "bg-emerald-500/10 text-emerald-600"}`}
				>
					{userId.substring(0, 2).toUpperCase()}
				</div>
				<div className="space-y-0.5 min-w-0">
					<p className="font-bold text-foreground text-sm sm:text-base truncate">
						{userId}
					</p>
					<p
						className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider truncate ${isPay ? "text-destructive" : "text-emerald-600"}`}
					>
						{isPay ? "Settlement Required" : "Waiting for Return"}
					</p>
				</div>
			</div>
			<div className="text-right relative z-10 shrink-0 pl-2">
				<p
					className={`font-black font-mono text-lg sm:text-xl tracking-tighter ${isPay ? "text-destructive" : "text-emerald-600"}`}
				>
					{isPay ? "-" : "+"}
					{formatMoney(amount, "THB")}
				</p>
				<div className="flex items-center justify-end gap-1 text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase">
					Details <ChevronRight className="size-3" />
				</div>
			</div>

			{/* Background Accent */}
			<div
				className={`absolute top-0 right-0 size-24 blur-[40px] opacity-10 -mr-10 -mt-10 pointer-events-none ${isPay ? "bg-destructive" : "bg-emerald-500"}`}
			/>
		</motion.div>
	);
});
