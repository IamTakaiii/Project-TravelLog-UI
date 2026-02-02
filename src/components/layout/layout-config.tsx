import {
	Bolt,
	Map,
	Mail,
	User,
	Settings,
} from "lucide-react";

import { type LucideIcon } from "lucide-react";

export interface MenuItem {
	title?: string;
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
	separator?: boolean;
}

export type MenuConfig = MenuItem[];

export const MENU_SIDEBAR_MAIN: MenuConfig = [
	{
		title: "Travel Log",
		children: [
			{
				title: "Dashboard",
				path: "/dashboard",
				icon: Bolt,
			},
			{
				title: "My Trips",
				path: "/trips",
				icon: Map,
			},
			{
				title: "Invitations",
				path: "/invitations",
				icon: Mail,
			},
			{
				title: "Communities",
				icon: Map,
				children: [
					{
						title: "Travelers",
						path: "/communities/travelers",
					},
					{
						title: "Local Guides",
						path: "/communities/guides",
					},
					{
						title: "Events",
						path: "/communities/events",
						badge: "New",
					},
				],
			},
		],
	},
	{
		title: "Account",
		children: [
			{
				title: "Profile",
				path: "/profile",
				icon: User,
			},
			{
				title: "Settings",
				path: "/settings",
				icon: Settings,
			},
		],
	},
];

export const MENU_SIDEBAR_RESOURCES: MenuConfig = [];
