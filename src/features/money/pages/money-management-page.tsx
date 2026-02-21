import { useState, useCallback, useMemo } from "react";
import { useParams } from "@tanstack/react-router";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { expensesQueryOptions } from "../queries/money-queries";
import { tripQueryOptions } from "@/features/trips/queries/trips-queries";
import {
	ExpenseFormSheet,
	ExpenseDetailSheet,
	ExpensesTab,
	BalancesTab,
	MoneyManagementHeader,
} from "../components";
import { useExpenseFilters } from "../hooks/use-expense-filters";
import { useBudgetStats } from "../hooks/use-budget-stats";
import { Expense, CurrencyCode } from "../types";
import { TABS } from "../constants/tabs";
import { calculateTripDuration } from "@/features/trips/utils/trip-duration";

import type { TabType } from "../constants/tabs";
import { FeaturePageLayout } from "@/components/common/feature-page-layout";
import { useExpenseActions } from "../hooks/use-expense-actions";
import { TabSwitcher } from "@/components/common/tab-switcher";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { sessionQueryOptions } from "@/features/auth/queries/auth-queries";

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
		handleSettle,
		isDeleting,
	} = useExpenseActions(trip.id);

	const tripCurrency = (trip.currency as CurrencyCode) || "THB";
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

	const { t } = useTranslation();

	const handleExpenseClick = useCallback((expense: Expense) => {
		setSelectedExpense(expense);
	}, [setSelectedExpense]);

	const moneyTabs = useMemo(() => [
		{ id: TABS.EXPENSES, label: t("money.tabs.expenses"), icon: Receipt },
		{ id: TABS.BALANCES, label: t("money.tabs.balances"), icon: ArrowRightLeft },
	], [t]);

	const { data: session } = useQuery(sessionQueryOptions);
	const userMap = useMemo(() => new Map(trip.members.map(m => [m.userId, m.user.name])), [trip.members]);

	return (
		<FeaturePageLayout>
			<MoneyManagementHeader trip={trip} budgetStats={budgetStats} />

			<TabSwitcher
				activeTab={activeTab}
				onTabChange={(tab) => setActiveTab(tab as TabType)}
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
						userMap={userMap}
						tripCurrency={tripCurrency}
					/>

				) : (
					<BalancesTab
						expenses={expenses}
						currentUserId={(session as any)?.user?.id || ""}
						userMap={userMap}
						tripCurrency={tripCurrency}
						onSettle={handleSettle}
					/>
				)}
			</AnimatePresence>

			<div className="fixed bottom-6 right-6 z-50">
				<ExpenseFormSheet tripId={trip.id} currency={tripCurrency} />
			</div>

			<ExpenseDetailSheet
				expense={isEditFormOpen || isDeleteDialogOpen ? null : selectedExpense}
				onClose={() => setSelectedExpense(null)}
				onEdit={handleEditExpense}
				onDelete={handleDeleteExpense}
			/>

			<ExpenseFormSheet
				tripId={trip.id}
				currency={tripCurrency}
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
				title={t("money.confirm.delete_title")}
				description={
					<>
						{t("money.confirm.delete_description")} <span className="text-foreground font-bold italic">"{selectedExpense?.description}"</span>.
					</>
				}
				confirmText={t("money.confirm.confirm_delete")}
				cancelText={t("money.confirm.cancel_delete")}
				onConfirm={handleDelete}
				isLoading={isDeleting}
				variant="destructive"
				icon={<Trash2 className="size-7 text-destructive" />}
			/>
		</FeaturePageLayout>
	);
}



