import { useState, useCallback } from "react";
import { useParams } from "@tanstack/react-router";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { expensesQueryOptions } from "../queries/money-queries";
import { tripQueryOptions } from "@/features/trips/queries/trips-queries";
import { ExpenseFormSheet } from "../components/expense-form-sheet";
import { ExpenseDetailSheet } from "../components/expense-detail-sheet";
import { MoneyHeader } from "../components/money-header";
import { BudgetSummaryCard } from "../components/budget-summary-card";
import { CentralFundCard } from "../components/central-fund-card";
import { ExpensesTab } from "../components/expenses-tab";
import { BalancesTab } from "../components/balances-tab";
import { useExpenseFilters } from "../hooks/use-expense-filters";
import { useBudgetStats } from "../hooks/use-budget-stats";
import { Expense, CurrencyCode } from "../types";
import { TABS } from "../constants/tabs";
import { calculateTripDuration } from "@/features/trips/utils/trip-duration";

import type { TabType } from "../constants/tabs";
import { MOCK_USER_IDS } from "../mock/mock-users";
import { FeaturePageLayout } from "@/components/common/feature-page-layout";
import { useExpenseActions } from "../hooks/use-expense-actions";
import { TabSwitcher } from "@/components/common/tab-switcher";
import { ConfirmDialog } from "@/components/common/confirm-dialog";

import { Trash2, Receipt, ArrowRightLeft } from "lucide-react";

export function MoneyManagementPage() {
	const params = useParams({ from: "/_layout/trips/$tripId/money" });
	const { data: trip } = useSuspenseQuery(tripQueryOptions(params.tripId));
	const { data: expenses = [], isLoading: isExpensesLoading } = useQuery(expensesQueryOptions(trip.id));

	const [activeTab, setActiveTab] = useState<TabType>(TABS.EXPENSES);

	const {
		selectedItem: selectedExpense,
		setSelectedItem: setSelectedExpense,
		isEditOpen: isEditFormOpen,
		setIsEditOpen: setIsEditFormOpen,
		isDeleteOpen: isDeleteDialogOpen,
		setIsDeleteOpen: setIsDeleteDialogOpen,
		openEdit: handleEditExpense,
		openDelete: handleDeleteExpense,
		handleDelete,
		isDeleting,
	} = useExpenseActions(trip.id);

	const totalBudget = trip.budget ? parseFloat(trip.budget) : 0;
	const tripDays = calculateTripDuration(trip.startDate, trip.endDate);

	const budgetStats = useBudgetStats({ expenses, totalBudget, tripDays });

	const {
		searchQuery,
		setSearchQuery,
		selectedCategory,
		filteredExpenses,
		handleCategoryToggle,
		clearSearch,
	} = useExpenseFilters({ expenses });

	const handleExpenseClick = useCallback((expense: Expense) => {
		setSelectedExpense(expense);
	}, [setSelectedExpense]);

	const handleTabChange = useCallback((tab: TabType) => {
		setActiveTab(tab);
	}, []);

	const moneyTabs = [
		{ id: TABS.EXPENSES, label: "Expenses", icon: Receipt },
		{ id: TABS.BALANCES, label: "Balances", icon: ArrowRightLeft },
	];

	return (
		<FeaturePageLayout>
			<MoneyHeader tripId={trip.id} tripTitle={trip.title} />

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<BudgetSummaryCard
					totalSpent={budgetStats.totalSpent}
					totalBudget={budgetStats.totalBudget}
					remaining={budgetStats.remaining}
					percentage={budgetStats.percentage}
					dailyAverage={budgetStats.dailyAverage}
					currency={(trip.currency as CurrencyCode) || "THB"}
				/>

				<CentralFundCard
					tripId={trip.id}
					currency={(trip.currency as CurrencyCode) || "THB"}
				/>
			</div>

			<TabSwitcher
				activeTab={activeTab}
				onTabChange={handleTabChange}
				tabs={moneyTabs}
			/>

			<AnimatePresence mode="wait">
				{activeTab === TABS.EXPENSES ? (
					<ExpensesTab
						searchQuery={searchQuery}
						onSearchChange={setSearchQuery}
						onSearchClear={clearSearch}
						selectedCategory={selectedCategory}
						onCategoryToggle={handleCategoryToggle}
						filteredExpenses={filteredExpenses}
						onExpenseClick={handleExpenseClick}
						isLoading={isExpensesLoading}
						userMap={new Map(trip.members.map(m => [m.userId, m.user.name]))}
						tripCurrency={(trip.currency as CurrencyCode) || "THB"}
					/>

				) : (
					<BalancesTab
						expenses={expenses}
						currentUserId={MOCK_USER_IDS.CURRENT_USER}
					/>
				)}
			</AnimatePresence>


			{/* Floating Action Button */}
			<div className="fixed bottom-6 right-6 z-50">
				<ExpenseFormSheet
					tripId={trip.id}
					currency={trip.currency || "THB"}
				/>
			</div>

			<ExpenseDetailSheet
				expense={isEditFormOpen || isDeleteDialogOpen ? null : selectedExpense}
				onClose={() => setSelectedExpense(null)}
				onEdit={handleEditExpense}
				onDelete={handleDeleteExpense}
			/>

			<ExpenseFormSheet
				tripId={trip.id}
				currency={trip.currency || "THB"}
				expense={selectedExpense || undefined}
				open={isEditFormOpen}
				onOpenChange={(open) => {
					setIsEditFormOpen(open);
					if (!open && !isDeleteDialogOpen) setSelectedExpense(null);
				}}
			/>

			<ConfirmDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				title="Delete Expense?"
				description={
					<>
						You're about to remove{" "}
						<span className="text-foreground font-bold italic">
							"{selectedExpense?.description}"
						</span>
						. This action is permanent and cannot be undone.
					</>
				}
				confirmText="Delete Permanently"
				cancelText="Keep Expense"
				onConfirm={handleDelete}
				isLoading={isDeleting}
				variant="destructive"
				icon={<Trash2 className="size-7 text-destructive" />}
			/>
		</FeaturePageLayout>
	);
}



