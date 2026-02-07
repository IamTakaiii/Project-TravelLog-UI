import { Filter } from "lucide-react";
import { Expense } from "../types";
import { ExpenseCard } from "./expense-card";

interface ExpenseListProps {
	expenses: Expense[];
	onExpenseClick: (expense: Expense) => void;
}

export function ExpenseList({ expenses, onExpenseClick }: ExpenseListProps) {
	if (expenses.length === 0) {
		return (
			<div className="py-16 text-center">
				<div className="bg-muted/30 p-4 rounded-full w-fit mx-auto mb-3">
					<Filter className="size-8 text-muted-foreground/30" />
				</div>
				<p className="font-bold text-sm">No expenses found</p>
				<p className="text-xs text-muted-foreground">
					Try adjusting your filters
				</p>
			</div>
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
