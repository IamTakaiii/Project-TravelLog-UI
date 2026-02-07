import { Bolt, Map, Mail, User, Settings } from "lucide-react";

import { type LucideIcon } from "lucide-react";

export interface MenuItem {
	title?: string;
	titleKey?: string;
	desc?: string;
	img?: string;
	icon?: LucideIcon;
	path?: string;
	rootPath?: string;
	childrenIndex?: number;
	heading?: string;
	children?: MenuConfig;
	disabled?: boolean;
	collapse?: boolean;
	collapseTitle?: string;
	expandTitle?: string;
	badge?: string;
	badgeKey?: string;
	separator?: boolean;
}

export type MenuConfig = MenuItem[];

export const MENU_SIDEBAR_MAIN: MenuConfig = [
	{
		title: "Travel Log",
		titleKey: "menu.sections.travel_log",
		children: [
			{
				title: "Dashboard",
				titleKey: "menu.dashboard",
				path: "/dashboard",
				icon: Bolt,
			},
			{
				title: "My Trips",
				titleKey: "menu.trips",
				path: "/trips",
				icon: Map,
			},
			{
				title: "Invitations",
				titleKey: "menu.invitations",
				path: "/invitations",
				icon: Mail,
			},
			{
				title: "Communities",
				titleKey: "menu.communities.title",
				icon: Map,
				children: [
					{
						title: "Travelers",
						titleKey: "menu.communities.travelers",
						path: "/communities/travelers",
					},
					{
						title: "Local Guides",
						titleKey: "menu.communities.guides",
						path: "/communities/guides",
					},
					{
						title: "Events",
						titleKey: "menu.communities.events",
						path: "/communities/events",
						badge: "New",
						badgeKey: "menu.badges.new",
					},
				],
			},
		],
	},
	{
		title: "Account",
		titleKey: "menu.sections.account",
		children: [
			{
				title: "Profile",
				titleKey: "menu.profile",
				path: "/profile",
				icon: User,
			},
			{
				title: "Settings",
				titleKey: "menu.settings",
				path: "/settings",
				icon: Settings,
			},
		],
	},
];

export const MENU_SIDEBAR_RESOURCES: MenuConfig = [];
