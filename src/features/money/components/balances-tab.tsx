import { motion } from "framer-motion";
import { Expense } from "../types";
import { DebtSummary } from "./debt-summary";
import { ANIMATION_VARIANTS } from "../constants";

interface BalancesTabProps {
	expenses: Expense[];
	currentUserId: string;
}

export function BalancesTab({ expenses, currentUserId }: BalancesTabProps) {
	return (
		<motion.div
			key="balances"
			{...ANIMATION_VARIANTS.tab}
		>
			<DebtSummary expenses={expenses} currentUserId={currentUserId} />
		</motion.div>
	);
}
