import { motion } from "framer-motion";
import { Expense, CurrencyCode, BackendDebts } from "../types";
import { DebtSummary } from "./debt-summary";
import { ANIMATION_VARIANTS } from "../constants/tabs";

interface BalancesTabProps {
	expenses: Expense[];
	currentUserId: string;
	userMap: Map<string, string>;
	tripCurrency: CurrencyCode;
	onSettle: (amount: number, type: 'pay' | 'receive', targetUserId: string, currentUserId: string, targetUserName: string, currency: CurrencyCode) => Promise<void>;
	backendDebts?: BackendDebts;
}

export function BalancesTab({ expenses, currentUserId, userMap, tripCurrency, onSettle, backendDebts }: BalancesTabProps) {
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
				backendDebts={backendDebts}
			/>
		</motion.div>
	);
}
