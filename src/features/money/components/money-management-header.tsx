import { MoneyHeader } from "../components/money-header";
import { BudgetSummaryCard } from "../components/budget-summary-card";
import { CentralFundCard } from "../components/central-fund-card";
import { CurrencyCode } from "../types";
import { BudgetStats } from "../utils/budget-calculator";

interface MoneyManagementHeaderProps {
	trip: {
		id: string;
		title: string;
		currency?: string;
	};
	budgetStats: BudgetStats;
	onHistoryClick?: () => void;
}

export function MoneyManagementHeader({
	trip,
	budgetStats,
	onHistoryClick,
}: MoneyManagementHeaderProps) {
	const currency = (trip.currency as CurrencyCode) || "THB";

	return (
		<div className="space-y-6">
			<MoneyHeader
				tripId={trip.id}
				tripTitle={trip.title}
				onHistoryClick={onHistoryClick}
			/>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<BudgetSummaryCard
					totalSpent={budgetStats.totalSpent}
					totalBudget={budgetStats.totalBudget}
					remaining={budgetStats.remaining}
					percentage={budgetStats.percentage}
					dailyAverage={budgetStats.dailyAverage}
					currency={currency}
				/>

				<CentralFundCard tripId={trip.id} currency={currency} />
			</div>
		</div>
	);
}
