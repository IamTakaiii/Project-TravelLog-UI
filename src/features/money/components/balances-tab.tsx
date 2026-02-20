import { motion } from "framer-motion";
import { Expense } from "../types";
import { DebtSummary } from "./debt-summary";
import { ANIMATION_VARIANTS } from "../constants/tabs";

interface BalancesTabProps {
	expenses: Expense[];
	currentUserId: string;
	userMap: Map<string, string>;
	tripCurrency: import("../types").CurrencyCode;
	onSettle: (amount: number, type: 'pay' | 'receive', targetUserId: string, currentUserId: string, targetUserName: string, currency: import("../types").CurrencyCode) => Promise<void>;
}

export function BalancesTab({ expenses, currentUserId, userMap, tripCurrency, onSettle }: BalancesTabProps) {
	return (
		<motion.div
			key="balances"
			{...ANIMATION_VARIANTS.tab}
		>
			<DebtSummary
				expenses={expenses}
				currentUserId={currentUserId}
				userMap={userMap}
				tripCurrency={tripCurrency}
				onSettle={onSettle}
			/>
		</motion.div>
	);
}
