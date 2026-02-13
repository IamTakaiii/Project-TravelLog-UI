import { Filter } from "lucide-react";
import { Expense } from "../types";
import { ExpenseCard } from "./expense-card";
import { EmptyState } from "@/components/common/empty-state";

interface ExpenseListProps {
	expenses: Expense[];
	onExpenseClick: (expense: Expense) => void;
}

export function ExpenseList({ expenses, onExpenseClick }: ExpenseListProps) {
	if (expenses.length === 0) {
		return (
			<EmptyState
				icon={Filter}
				title="No expenses found"
				description="Try adjusting your filters"
				animate={false}
				className="py-16"
			/>
		);
	}

	return (
		<div className="space-y-2 w-full overflow-hidden">
			{expenses.map((expense) => (
				<ExpenseCard
					key={expense.id}
					expense={expense}
					onClick={() => onExpenseClick(expense)}
				/>
			))}
		</div>
	);
}

