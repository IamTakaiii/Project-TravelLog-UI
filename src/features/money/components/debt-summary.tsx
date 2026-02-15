import { useState, memo, useMemo } from "react";
import { useDebtCalculator, DebtBreakdown } from "../hooks/use-debt-calculator";
import { Expense } from "../types";
import { formatMoney } from "../utils/money-formatter";
import {
	ArrowDownLeft,
	ArrowUpRight,
	ChevronRight,
	TrendingUp,
	TrendingDown,
	Minus,
	Users,
	Sparkles,
	CircleDot,
} from "lucide-react";
import { motion } from "framer-motion";
import { DebtDetailSheet } from "./debt-detail-sheet";
import { cn } from "@/lib/utils";

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

	const netBalance = totalReceivable - totalPayable;
	const totalPeople = whoOwesMe.length + iOweWho.length;

	if (whoOwesMe.length === 0 && iOweWho.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center py-16 sm:py-24 text-muted-foreground bg-gradient-to-br from-card/80 to-muted/30 backdrop-blur-sm rounded-[2.5rem] border border-dashed border-border/50 flex flex-col items-center space-y-5 mx-auto max-w-md"
			>
				<div className="relative">
					<div className="bg-gradient-to-br from-emerald-500/10 to-primary/10 p-7 rounded-full">
						<Sparkles className="size-10 text-emerald-500/40" />
					</div>
					<div className="absolute -top-1 -right-1 size-5 bg-emerald-500 rounded-full flex items-center justify-center">
						<span className="text-white text-[10px]">✓</span>
					</div>
				</div>
				<div className="space-y-2">
					<p className="font-bold text-lg text-foreground">All Settled Up!</p>
					<p className="text-sm opacity-60 max-w-[240px]">
						No outstanding debts between you and your friends 🎉
					</p>
				</div>
			</motion.div>
		);
	}

	return (
		<div className="space-y-8 sm:space-y-10">
			{/* Net Balance Hero */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className={cn(
					"relative overflow-hidden rounded-[2rem] p-6 sm:p-8 border",
					netBalance > 0
						? "bg-gradient-to-br from-emerald-500/5 via-emerald-500/10 to-teal-500/5 border-emerald-500/15"
						: netBalance < 0
							? "bg-gradient-to-br from-destructive/5 via-destructive/10 to-orange-500/5 border-destructive/15"
							: "bg-gradient-to-br from-muted/40 to-muted/20 border-border/50"
				)}
			>
				{/* Decorative Elements */}
				<div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none"
					style={{
						background: netBalance > 0
							? "radial-gradient(circle, rgb(16 185 129), transparent)"
							: netBalance < 0
								? "radial-gradient(circle, rgb(239 68 68), transparent)"
								: "radial-gradient(circle, rgb(148 163 184), transparent)"
					}}
				/>

				<div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<div className={cn(
								"p-1.5 rounded-lg",
								netBalance > 0 ? "bg-emerald-500/15" : netBalance < 0 ? "bg-destructive/15" : "bg-muted"
							)}>
								{netBalance > 0 ? (
									<TrendingUp className="size-3.5 text-emerald-600" />
								) : netBalance < 0 ? (
									<TrendingDown className="size-3.5 text-destructive" />
								) : (
									<Minus className="size-3.5 text-muted-foreground" />
								)}
							</div>
							<span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
								Net Balance
							</span>
						</div>
						<p className={cn(
							"text-3xl sm:text-4xl font-black font-mono tracking-tighter",
							netBalance > 0 ? "text-emerald-600" : netBalance < 0 ? "text-destructive" : "text-muted-foreground"
						)}>
							{netBalance > 0 ? "+" : ""}{formatMoney(Math.abs(netBalance), "THB")}
						</p>
					</div>

					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<Users className="size-3.5" />
						<span className="font-semibold">{totalPeople} {totalPeople === 1 ? "person" : "people"}</span>
					</div>
				</div>

				{/* Mini Summary Bar */}
				<div className="relative z-10 mt-6 grid grid-cols-2 gap-3">
					<div className="flex items-center gap-3 bg-background/60 backdrop-blur-sm rounded-2xl p-3.5 border border-emerald-500/10">
						<div className="p-2 rounded-xl bg-emerald-500/10">
							<ArrowDownLeft className="size-4 text-emerald-600" />
						</div>
						<div>
							<p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-600/70">
								To Receive
							</p>
							<p className="text-base sm:text-lg font-black text-emerald-600 font-mono tracking-tight">
								{formatMoney(totalReceivable, "THB")}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-3 bg-background/60 backdrop-blur-sm rounded-2xl p-3.5 border border-destructive/10">
						<div className="p-2 rounded-xl bg-destructive/10">
							<ArrowUpRight className="size-4 text-destructive" />
						</div>
						<div>
							<p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-destructive/70">
								To Pay
							</p>
							<p className="text-base sm:text-lg font-black text-destructive font-mono tracking-tight">
								{formatMoney(totalPayable, "THB")}
							</p>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Who Owes Me */}
			{whoOwesMe.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.1 }}
					className="space-y-4"
				>
					<div className="flex items-center justify-between px-1">
						<div className="flex items-center gap-2.5">
							<div className="p-2 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/10">
								<ArrowDownLeft className="size-4 text-emerald-600" />
							</div>
							<div>
								<h3 className="text-sm font-bold text-foreground">
									Friends Owe You
								</h3>
								<p className="text-[10px] text-muted-foreground">
									{whoOwesMe.length} {whoOwesMe.length === 1 ? "person" : "people"}
								</p>
							</div>
						</div>
						<span className="text-sm font-black font-mono text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
							+{formatMoney(totalReceivable, "THB")}
						</span>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{whoOwesMe.map((item, index) => (
							<DebtCard
								key={item.userId}
								userId={item.userId}
								amount={item.amount}
								type="receive"
								totalAmount={totalReceivable}
								transactionCount={item.transactions.length}
								index={index}
								onClick={() => setSelectedDebt({ item, type: "receive" })}
							/>
						))}
					</div>
				</motion.div>
			)}

			{/* I Owe Who */}
			{iOweWho.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.2 }}
					className="space-y-4"
				>
					<div className="flex items-center justify-between px-1">
						<div className="flex items-center gap-2.5">
							<div className="p-2 rounded-xl bg-destructive/10 ring-1 ring-destructive/10">
								<ArrowUpRight className="size-4 text-destructive" />
							</div>
							<div>
								<h3 className="text-sm font-bold text-foreground">
									You Owe Friends
								</h3>
								<p className="text-[10px] text-muted-foreground">
									{iOweWho.length} {iOweWho.length === 1 ? "person" : "people"}
								</p>
							</div>
						</div>
						<span className="text-sm font-black font-mono text-destructive bg-destructive/10 px-3 py-1 rounded-full">
							-{formatMoney(totalPayable, "THB")}
						</span>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{iOweWho.map((item, index) => (
							<DebtCard
								key={item.userId}
								userId={item.userId}
								amount={Math.abs(item.amount)}
								type="pay"
								totalAmount={totalPayable}
								transactionCount={item.transactions.length}
								index={index}
								onClick={() => setSelectedDebt({ item, type: "pay" })}
							/>
						))}
					</div>
				</motion.div>
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

// Generate a consistent color for avatars based on userId
function getAvatarColors(userId: string): { bg: string; text: string; ring: string } {
	const colors = [
		{ bg: "bg-violet-500/15", text: "text-violet-600", ring: "ring-violet-500/20" },
		{ bg: "bg-blue-500/15", text: "text-blue-600", ring: "ring-blue-500/20" },
		{ bg: "bg-cyan-500/15", text: "text-cyan-600", ring: "ring-cyan-500/20" },
		{ bg: "bg-teal-500/15", text: "text-teal-600", ring: "ring-teal-500/20" },
		{ bg: "bg-amber-500/15", text: "text-amber-600", ring: "ring-amber-500/20" },
		{ bg: "bg-pink-500/15", text: "text-pink-600", ring: "ring-pink-500/20" },
		{ bg: "bg-rose-500/15", text: "text-rose-600", ring: "ring-rose-500/20" },
		{ bg: "bg-indigo-500/15", text: "text-indigo-600", ring: "ring-indigo-500/20" },
	];
	let hash = 0;
	for (let i = 0; i < userId.length; i++) {
		hash = userId.charCodeAt(i) + ((hash << 5) - hash);
	}
	return colors[Math.abs(hash) % colors.length]!;
}

const DebtCard = memo(function DebtCard({
	userId,
	amount,
	type,
	totalAmount,
	transactionCount,
	index,
	onClick,
}: {
	userId: string;
	amount: number;
	type: "pay" | "receive";
	totalAmount: number;
	transactionCount: number;
	index: number;
	onClick: () => void;
}) {
	const isPay = type === "pay";
	const percentage = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
	const avatarColors = useMemo(() => getAvatarColors(userId), [userId]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.35, delay: index * 0.06 }}
			whileHover={{ y: -3, transition: { duration: 0.2 } }}
			whileTap={{ scale: 0.98 }}
			onClick={onClick}
			className="group relative flex flex-col p-4 sm:p-5 rounded-[1.75rem] border border-border/40 bg-card/70 backdrop-blur-xl hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer overflow-hidden"
		>
			{/* Top Row: Avatar + Amount */}
			<div className="flex items-center justify-between relative z-10">
				<div className="flex items-center gap-3">
					{/* Avatar */}
					<div
						className={cn(
							"size-11 sm:size-12 rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm shrink-0 ring-2",
							avatarColors.bg,
							avatarColors.text,
							avatarColors.ring
						)}
					>
						{userId.substring(0, 2).toUpperCase()}
					</div>
					<div className="space-y-0.5 min-w-0">
						<p className="font-bold text-foreground text-sm sm:text-base truncate leading-tight">
							{userId}
						</p>
						<div className="flex items-center gap-1.5">
							<CircleDot
								className={cn(
									"size-2.5",
									isPay ? "text-destructive/60" : "text-emerald-500/60"
								)}
							/>
							<p className="text-[9px] sm:text-[10px] font-semibold text-muted-foreground truncate">
								{transactionCount} {transactionCount === 1 ? "expense" : "expenses"}
							</p>
						</div>
					</div>
				</div>

				{/* Amount */}
				<div className="text-right shrink-0 pl-2">
					<p
						className={cn(
							"font-black font-mono text-lg sm:text-xl tracking-tighter leading-tight",
							isPay ? "text-destructive" : "text-emerald-600"
						)}
					>
						{isPay ? "-" : "+"}
						{formatMoney(amount, "THB")}
					</p>
					<div className="flex items-center justify-end gap-0.5 mt-0.5">
						<span className="text-[9px] sm:text-[10px] font-semibold text-muted-foreground/70 group-hover:text-primary transition-colors">
							Details
						</span>
						<ChevronRight className="size-3 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
					</div>
				</div>
			</div>

			{/* Progress Bar */}
			<div className="mt-3.5 relative z-10">
				<div className="h-1.5 rounded-full bg-muted/60 overflow-hidden">
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: `${Math.min(percentage, 100)}%` }}
						transition={{ duration: 0.8, delay: 0.3 + index * 0.06, ease: "easeOut" }}
						className={cn(
							"h-full rounded-full",
							isPay
								? "bg-gradient-to-r from-destructive/60 to-destructive"
								: "bg-gradient-to-r from-emerald-400/60 to-emerald-500"
						)}
					/>
				</div>
			</div>

			{/* Background Accent */}
			<div
				className={cn(
					"absolute top-0 right-0 size-28 blur-[50px] opacity-[0.07] -mr-10 -mt-10 pointer-events-none transition-opacity group-hover:opacity-[0.12]",
					isPay ? "bg-destructive" : "bg-emerald-500"
				)}
			/>
		</motion.div>
	);
});
