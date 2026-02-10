import { useState, useCallback } from "react";
import { useParams } from "@tanstack/react-router";
import { useQuery, useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { expensesQueryOptions } from "../queries/money-queries";
import { tripQueryOptions } from "@/features/trips/queries/trips-queries";
import { ExpenseFormSheet } from "../components/expense-form-sheet";
import { ExpenseDetailSheet } from "../components/expense-detail-sheet";
import { MoneyHeader } from "../components/money-header";
import { BudgetSummaryCard } from "../components/budget-summary-card";
import { CentralFundCard } from "../components/central-fund-card";
import { TabSwitcher } from "../components/tab-switcher";
import { ExpensesTab } from "../components/expenses-tab";
import { BalancesTab } from "../components/balances-tab";
import { useExpenseFilters } from "../hooks/use-expense-filters";
import { useBudgetStats } from "../hooks/use-budget-stats";
import { Expense, CurrencyCode } from "../types";
import { TABS, TabType, ANIMATION_VARIANTS, MOCK_USER_IDS } from "../constants";
import { expensesApi } from "../api/expenses-api";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { Trash2 } from "lucide-react";

export function MoneyManagementPage() {
	const params = useParams({ from: "/_layout/trips/$tripId/money" });
	const { data: trip } = useSuspenseQuery(tripQueryOptions(params.tripId));
	const { data: expenses = [] } = useQuery(expensesQueryOptions(trip.id));
	const queryClient = useQueryClient();

	const [activeTab, setActiveTab] = useState<TabType>(TABS.EXPENSES);
	const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const totalBudget = trip.budget ? parseFloat(trip.budget) : 0;
	const budgetStats = useBudgetStats({ expenses, totalBudget });

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
	}, []);

	const handleEditExpense = useCallback((expense: Expense) => {
		setSelectedExpense(expense);
		setIsEditFormOpen(true);
	}, []);

	const deleteMutation = useMutation({
		mutationFn: (id: string) => expensesApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["expenses", trip.id] });
			toast.success("Expense deleted");
			setSelectedExpense(null);
			setIsDeleteDialogOpen(false);
		},
	});

	const handleDeleteExpense = useCallback((expense: Expense) => {
		setSelectedExpense(expense);
		setIsDeleteDialogOpen(true);
	}, []);

	const handleTabChange = useCallback((tab: TabType) => {
		setActiveTab(tab);
	}, []);

	return (
		<motion.div
			initial="hidden"
			animate="show"
			variants={ANIMATION_VARIANTS.container}
			className="min-h-screen bg-background p-6 lg:p-10 space-y-10"
		>
			{/* Decorative Background */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
				<div className="absolute top-20 right-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
				<div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] animate-pulse delay-1000" />
			</div>

			<div className="max-w-7xl mx-auto space-y-8">
				<MoneyHeader tripId={trip.id} tripTitle={trip.title} />

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<BudgetSummaryCard
						totalSpent={budgetStats.totalSpent}
						totalBudget={budgetStats.totalBudget}
						remaining={budgetStats.remaining}
						percentage={budgetStats.percentage}
						currency={(trip.currency as CurrencyCode) || "THB"}
					/>

					<CentralFundCard
						tripId={trip.id}
						currency={(trip.currency as CurrencyCode) || "THB"}
					/>
				</div>

				<TabSwitcher activeTab={activeTab} onTabChange={handleTabChange} />

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
						/>
					) : (
						<BalancesTab
							expenses={expenses}
							currentUserId={MOCK_USER_IDS.CURRENT_USER}
						/>
					)}
				</AnimatePresence>
			</div>

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
				onConfirm={() => selectedExpense && deleteMutation.mutate(selectedExpense.id)}
				isLoading={deleteMutation.isPending}
				variant="destructive"
				icon={<Trash2 className="size-7 text-destructive" />}
			/>
		</motion.div>
	);
}
