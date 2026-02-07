export const MOCK_USER_IDS = {
	CURRENT_USER: "u1",
	USER_2: "u2",
	USER_3: "u3",
} as const;

export const TABS = {
	EXPENSES: "expenses",
	BALANCES: "balances",
} as const;

export type TabType = (typeof TABS)[keyof typeof TABS];

export const ANIMATION_VARIANTS = {
	container: {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
			},
		},
	},
	tab: {
		initial: { opacity: 0, y: 10 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -10 },
		transition: { duration: 0.2 },
	},
} as const;
