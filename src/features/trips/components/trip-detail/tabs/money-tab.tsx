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
import { formatMoney } from "@/features/money/services/money-formatter";
import { CENTRAL_FUND_ID } from "@/features/money/constants/thresholds";
import { StatCard } from "@/components/common/stat-card";

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
				<StatCard
					title="Trip Budget"
					value={formatMoney(totalBudget, currency as any)}
					icon={DollarSign}
					colorClassName="text-primary"
					bgColorClassName="bg-primary/10"
					variant="centered"
				/>
				<StatCard
					title="Spent so far"
					value={formatMoney(totalSpent, currency as any)}
					icon={TrendingDown}
					colorClassName="text-destructive"
					bgColorClassName="bg-destructive/10"
					variant="centered"
				/>
				<StatCard
					title="Remaining"
					value={formatMoney(remaining, currency as any)}
					icon={TrendingUp}
					colorClassName="text-emerald-500"
					bgColorClassName="bg-emerald-500/10"
					variant="centered"
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

