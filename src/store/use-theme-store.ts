import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemePreset =
	| "ocean"
	| "sunset"
	| "forest"
	| "lavender"
	| "midnight"
	| "sakura";

export interface ThemePresetInfo {
	id: ThemePreset;
	name: string;
	emoji: string;
	description: string;
	primaryColor: string;
	accentColor: string;
}

export const themePresets: ThemePresetInfo[] = [
	{
		id: "ocean",
		name: "Ocean Teal",
		emoji: "🌊",
		description: "Beach & Ocean vibes",
		primaryColor: "oklch(0.55 0.15 195)",
		accentColor: "oklch(0.72 0.16 35)",
	},
	{
		id: "sunset",
		name: "Sunset Orange",
		emoji: "🌅",
		description: "Warm sunset glow",
		primaryColor: "oklch(0.65 0.2 35)",
		accentColor: "oklch(0.75 0.15 60)",
	},
	{
		id: "forest",
		name: "Forest Green",
		emoji: "🌲",
		description: "Mountain adventure",
		primaryColor: "oklch(0.5 0.15 145)",
		accentColor: "oklch(0.7 0.12 80)",
	},
	{
		id: "lavender",
		name: "Lavender Dream",
		emoji: "🌸",
		description: "Relaxing spa retreat",
		primaryColor: "oklch(0.6 0.15 300)",
		accentColor: "oklch(0.75 0.1 350)",
	},
	{
		id: "midnight",
		name: "Midnight Blue",
		emoji: "🌌",
		description: "Deep night sky",
		primaryColor: "oklch(0.45 0.15 270)",
		accentColor: "oklch(0.7 0.15 30)",
	},
	{
		id: "sakura",
		name: "Sakura Pink",
		emoji: "💐",
		description: "Cherry blossom bloom",
		primaryColor: "oklch(0.65 0.2 340)",
		accentColor: "oklch(0.7 0.15 150)",
	},
];

interface ThemeStore {
	preset: ThemePreset;
	setPreset: (preset: ThemePreset) => void;
	getPresetInfo: () => ThemePresetInfo;
}

export const useThemeStore = create<ThemeStore>()(
	persist(
		(set, get) => ({
			preset: "ocean",
			setPreset: (preset) => {
				set({ preset });
				// Apply theme class to document
				document.documentElement.setAttribute("data-theme", preset);
			},
			getPresetInfo: () => {
				const currentPreset = get().preset;
				return (
					themePresets.find((p) => p.id === currentPreset) ?? themePresets[0]!
				);
			},
		}),
		{
			name: "travellog-theme",
			onRehydrateStorage: () => (state) => {
				// Apply stored theme on page load
				if (state?.preset) {
					document.documentElement.setAttribute("data-theme", state.preset);
				}
			},
		}
	)
);
