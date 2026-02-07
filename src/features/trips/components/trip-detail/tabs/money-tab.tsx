import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
	Wallet,
	DollarSign,
	TrendingDown,
	TrendingUp,
	ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useTripDetail } from "../trip-detail-context";
import { tabContentVariants } from "../constants";
import { TabHeader } from "./tab-header";
import { expensesQueryOptions } from "@/features/money/queries/money-queries";
import {
	formatMoney,
	CENTRAL_FUND_ID,
} from "@/features/money/utils/money-utils";

export function MoneyTab() {
	const { t } = useTranslation();
	const { trip } = useTripDetail();
	const { data: expenses = [] } = useQuery(expensesQueryOptions(trip.id));

	// Calculate totals
	const totalBudget = trip.budget ? parseFloat(trip.budget) : 0;
	const totalSpent = expenses
		.filter(
			(ex) => ex.category !== "settlement" && ex.payerId !== CENTRAL_FUND_ID
		)
		.reduce((sum, ex) => sum + ex.thbAmount, 0);

	const remaining = totalBudget - totalSpent;
	const currency = trip.currency || "THB";

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={tabContentVariants}
			transition={{ duration: 0.2 }}
			className="space-y-8"
		>
			<TabHeader
				icon={Wallet}
				title={t("trips.detail.money_summary", "Money Manager")}
			/>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<SummaryCard
					label="Trip Budget"
					value={formatMoney(totalBudget, currency as any)}
					icon={DollarSign}
					color="text-primary"
					bgColor="bg-primary/10"
				/>
				<SummaryCard
					label="Spent so far"
					value={formatMoney(totalSpent, currency as any)}
					icon={TrendingDown}
					color="text-destructive"
					bgColor="bg-destructive/10"
				/>
				<SummaryCard
					label="Remaining"
					value={formatMoney(remaining, currency as any)}
					icon={TrendingUp}
					color="text-emerald-500"
					bgColor="bg-emerald-500/10"
				/>
			</div>

			{/* CTA Section */}
			<div className="relative group overflow-hidden bg-card/50 backdrop-blur-xl rounded-[2.5rem] p-10 border border-border/50 shadow-sm text-center space-y-6">
				<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 group-hover:scale-110 transition-transform duration-700" />

				<div className="relative z-10 space-y-4">
					<div className="bg-primary/10 p-5 rounded-3xl w-fit mx-auto ring-8 ring-primary/5 transition-transform duration-500 group-hover:rotate-[10deg]">
						<Wallet className="size-10 text-primary" />
					</div>
					<div className="space-y-2">
						<h3 className="text-2xl font-[800] tracking-tight text-foreground">
							Complete Finance Manager
						</h3>
						<p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
							Split bills, record places, track daily averages and manage debts
							with your group in one place.
						</p>
					</div>
					<Link
						to={`/trips/${trip.id}/money` as any}
						className="inline-block pt-2"
					>
						<Button
							size="lg"
							className="rounded-full font-black text-base px-8 py-7 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all gap-3 active:scale-95"
						>
							Manage Finances <ArrowRight className="size-5" />
						</Button>
					</Link>
				</div>
			</div>
		</motion.div>
	);
}

function SummaryCard({ label, value, icon: Icon, color, bgColor }: any) {
	return (
		<div className="bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-border/50 shadow-sm flex flex-col items-center justify-center text-center space-y-3 group hover:border-primary/30 transition-all duration-300">
			<div
				className={`p-4 rounded-2xl ${bgColor} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-5deg]`}
			>
				<Icon className={`size-6 ${color}`} />
			</div>
			<div className="space-y-1">
				<span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
					{label}
				</span>
				<p className={`text-2xl font-black tracking-tighter ${color}`}>
					{value}
				</p>
			</div>
		</div>
	);
}
