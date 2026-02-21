import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabOption<T extends string> {
	id: T;
	label: string;
	icon?: LucideIcon;
}

interface TabSwitcherProps<T extends string> {
	activeTab: T;
	onTabChange: (tab: T) => void;
	tabs: TabOption<T>[];
	className?: string;
}

export function TabSwitcher<T extends string>({
	activeTab,
	onTabChange,
	tabs,
	className,
}: TabSwitcherProps<T>) {
	return (
		<div
			className={cn(
				"flex items-center p-1.5 bg-muted/50 rounded-2xl border border-border/50 w-full max-w-md",
				className
			)}
		>
			{tabs.map((tab) => {
				const Icon = tab.icon;
				const isActive = activeTab === tab.id;

				return (
					<button
						key={tab.id}
						onClick={() => onTabChange(tab.id)}
						className={cn(
							"flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
							isActive
								? "bg-white dark:bg-zinc-800 text-foreground shadow-sm border border-border/50"
								: "text-zinc-500 dark:text-zinc-400 hover:text-foreground hover:bg-white/50 dark:hover:bg-zinc-800/50"
						)}
					>
						{Icon && <Icon className="size-4" />}
						{tab.label}
					</button>
				);
			})}
		</div>
	);
}
