import { Receipt, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { TABS } from "../constants/tabs";
import type { TabType } from "../constants/tabs";

interface TabSwitcherProps {
	activeTab: TabType;
	onTabChange: (tab: TabType) => void;
}

export function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
	return (
		<div className="flex items-center p-1.5 bg-muted/50 rounded-2xl border border-border/50 w-full max-w-md">
			<button
				onClick={() => onTabChange(TABS.EXPENSES)}
				className={cn(
					"flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
					activeTab === TABS.EXPENSES
						? "bg-background text-foreground shadow-sm border border-border/50"
						: "text-muted-foreground hover:text-foreground"
				)}
			>
				<Receipt className="size-4" /> Expenses
			</button>
			<button
				onClick={() => onTabChange(TABS.BALANCES)}
				className={cn(
					"flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
					activeTab === TABS.BALANCES
						? "bg-background text-foreground shadow-sm border border-border/50"
						: "text-muted-foreground hover:text-foreground"
				)}
			>
				<ArrowRightLeft className="size-4" /> Balances
			</button>
		</div>
	);
}
