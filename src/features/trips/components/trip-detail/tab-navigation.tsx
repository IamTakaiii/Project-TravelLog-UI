import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useTripDetail } from "./trip-detail-context";
import { TAB_CONFIGS } from "./constants";
import type { TabType } from "./types";

export function TabNavigation() {
	const { t } = useTranslation();
	const { activeTab, setActiveTab } = useTripDetail();

	return (
		<div className="flex items-center p-1.5 bg-muted/30 rounded-full w-full sm:w-fit border border-border/50 overflow-x-auto">
			{TAB_CONFIGS.map((tab) => (
				<TabButton
					key={tab.id}
					id={tab.id}
					icon={tab.icon}
					label={t(tab.labelKey, tab.defaultLabel)}
					isActive={activeTab === tab.id}
					onClick={() => setActiveTab(tab.id)}
				/>
			))}
		</div>
	);
}

interface TabButtonProps {
	id: TabType;
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	isActive: boolean;
	onClick: () => void;
}

function TabButton({ icon: Icon, label, isActive, onClick }: TabButtonProps) {
	return (
		<button
			onClick={onClick}
			className={cn(
				"flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap flex-1 sm:flex-none",
				isActive
					? "bg-background text-primary border-2 border-primary shadow-sm"
					: "text-muted-foreground hover:text-foreground border-2 border-transparent"
			)}
		>
			<Icon className="size-4" />
			<span className="hidden xs:inline sm:inline">{label}</span>
		</button>
	);
}
