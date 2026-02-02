import { useCallback } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
	AccordionMenu,
	AccordionMenuGroup,
	AccordionMenuItem,
	AccordionMenuLabel,
	AccordionMenuSub,
	AccordionMenuSubContent,
	AccordionMenuSubTrigger,
} from "@/components/ui/accordion-menu";
import { Badge } from "@/components/ui/badge";
import { MENU_SIDEBAR_MAIN, type MenuItem } from "../layout-config"; // Import MenuItem type

export function SidebarPrimaryMenu() {
	const { pathname } = useLocation();

	// Memoize matchPath to prevent unnecessary re-renders
	const matchPath = useCallback(
		(path: string): boolean =>
			path === pathname ||
			(path.length > 1 && pathname.startsWith(path) && path !== "/layout-12"),
		[pathname]
	);

	const renderMenuItem = (item: MenuItem, index: number) => {
		if (item.children && item.children.length > 0) {
			return (
				<AccordionMenuSub key={index} value={item.title || `item-${index}`}>
					<AccordionMenuSubTrigger className="h-11 px-3 text-sm font-medium text-muted-foreground rounded-xl transition-all duration-200 hover:text-primary hover:bg-primary/5 data-[state=open]:text-primary data-[state=open]:bg-primary/5 [&_svg]:transition-colors">
						{item.icon && <item.icon />}
						<span>{item.title}</span>
						{item.badge && (
							<Badge size="sm" variant="destructive" appearance="light" className="ml-auto">
								{item.badge}
							</Badge>
						)}
					</AccordionMenuSubTrigger>
					<AccordionMenuSubContent
						parentValue={item.title || `item-${index}`}
						type="multiple"
						className="relative border-l border-primary/20 ml-7 pl-0 my-1 space-y-1"
					>
						{item.children.map((child: MenuItem, childIndex: number) =>
							renderMenuItem(child, childIndex)
						)}
					</AccordionMenuSubContent>
				</AccordionMenuSub>
			);
		}

		return (
			<AccordionMenuItem key={index} value={item.path || "#"}>
				<Link to={item.path || "#"} className="flex items-center gap-3 w-full">
					{item.icon && <item.icon className="size-4" />}
					<span>{item.title}</span>
					{item.badge && (
						<Badge size="sm" variant="destructive" appearance="light" className="ml-auto">
							{item.badge}
						</Badge>
					)}
				</Link>
			</AccordionMenuItem>
		);
	};

	return (
		<AccordionMenu
			selectedValue={pathname}
			matchPath={matchPath}
			type="multiple"
			className="space-y-6 px-4 py-2"
			classNames={{
				label: "text-[0.65rem] uppercase tracking-wider font-bold text-muted-foreground/70 mb-3 px-3",
				item: "h-11 px-3 text-sm font-medium text-muted-foreground rounded-xl transition-all duration-200 hover:text-primary hover:bg-primary/5 data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary data-[selected=true]:font-semibold [&_svg]:transition-colors",
				group: "",
			}}
		>
			{MENU_SIDEBAR_MAIN.map((item, index) => {
				return (
					<AccordionMenuGroup key={index}>
						<AccordionMenuLabel>{item.title}</AccordionMenuLabel>
						{item.children?.map((child, childIndex) => renderMenuItem(child, childIndex))}
					</AccordionMenuGroup>
				);
			})}
		</AccordionMenu>
	);
}
