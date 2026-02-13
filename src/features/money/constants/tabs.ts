import { staggerContainer, tabTransition } from "@/common/animations";

export const TABS = {
	EXPENSES: "expenses",
	BALANCES: "balances",
} as const;

export type TabType = (typeof TABS)[keyof typeof TABS];

export const ANIMATION_VARIANTS = {
	container: staggerContainer,
	tab: tabTransition,
} as const;

