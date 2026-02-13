import { memo } from "react";
import { motion } from "framer-motion";
import { formatMoney } from "../utils/money-formatter";
import { getCategoryById } from "../utils/category-lookup";
import { CENTRAL_FUND_ID } from "../constants/thresholds";
import { CategoryIcon } from "./category-icon";
import { Expense } from "../types";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface ExpenseCardProps {
	expense: Expense;
	onClick?: () => void;
}

export const ExpenseCard = memo(function ExpenseCard({
	expense,
	onClick,
}: ExpenseCardProps) {
	const category =
		getCategoryById(expense.category) ||
		getCategoryById("other");
	const isCentral = expense.payerId === CENTRAL_FUND_ID;

	if (!category) return null;

	return (
		<motion.div
			layout
			whileTap={{ scale: 0.98 }}
			onClick={onClick}
			className="flex items-center gap-3 p-3 bg-card/30 rounded-2xl border border-border/50 active:bg-card/50 transition-colors cursor-pointer"
		>
			<div
				className={cn(
					"size-11 rounded-xl flex items-center justify-center shrink-0",
					category.color
				)}
			>
				<CategoryIcon iconName={category.icon} className="size-5" />
			</div>

			<div className="flex-1 min-w-0">
				<h4 className="font-bold text-sm truncate">{expense.description}</h4>
				<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
					<span className="truncate max-w-[80px]">
						{isCentral ? "Central" : expense.payerId}
					</span>
					<span>•</span>
					<span>
						{new Date(expense.date).toLocaleDateString([], {
							month: "short",
							day: "numeric",
						})}
					</span>
					{expense.place?.name && (
						<>
							<span>•</span>
							<MapPin className="size-3" />
							<span className="truncate max-w-[100px]">
								{expense.place.name}
							</span>
						</>
					)}
				</div>
			</div>

			<div className="text-right shrink-0">
				<p className="font-black text-base tracking-tight">
					{formatMoney(expense.thbAmount, "THB")}
				</p>
				{expense.currency !== "THB" && (
					<p className="text-[10px] text-muted-foreground">
						{expense.currency}
					</p>
				)}
			</div>
		</motion.div>
	);
});
