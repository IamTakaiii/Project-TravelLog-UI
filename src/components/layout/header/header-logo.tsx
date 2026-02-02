import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, PanelRight, Map } from "lucide-react";
import {
	Sheet,
	SheetBody,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useLayout } from "@/hooks/use-layout";
import { useEffect, useState } from "react";
import { HeaderSearch } from "./header-search";
import { SidebarPrimaryMenu } from "../sidebar/sidebar-primary-menu";
import { Separator } from "@/components/ui/separator";

export function HeaderLogo() {
	const { isMobile, sidebarToggle } = useLayout();
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	useEffect(() => {
		setIsSheetOpen(false);
	}, []);

	return (
		<div className="flex items-center gap-2 lg:w-(--sidebar-width) px-5">
			{/* Mobile sidebar toggle */}
			{isMobile && (
				<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
					<SheetTrigger asChild>
						<Button variant="ghost" mode="icon" size="sm" className="-ms-1.5">
							<Menu className="size-4" />
						</Button>
					</SheetTrigger>
					<SheetContent
						className="p-0 gap-0 w-[225px] lg:w-(--sidebar-width)"
						side="left"
						close={false}
					>
						<SheetHeader className="p-0 space-y-0" />
						<SheetBody className="flex flex-col grow p-0">
							<HeaderSearch isMobileNav />
							<ScrollArea className="grow h-[calc(100vh-5.5rem)] lg:h-[calc(100vh-4rem)] mt-0 mb-2.5 lg:my-7.5">
								<SidebarPrimaryMenu />
								<Separator className="my-2.5" />
							</ScrollArea>
						</SheetBody>
					</SheetContent>
				</Sheet>
			)}

			{/* Brand */}
			<div className="flex items-center justify-between w-full">
				{/* Logo */}
				<Link to="/" className="flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Map className="size-5" />
					</div>
					<span className="text-lg font-bold tracking-tight hidden lg:block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
						Travel Log
					</span>
				</Link>

				{/* Sidebar toggle */}
				<Button
					mode="icon"
					variant="ghost"
					onClick={sidebarToggle}
					className="hidden lg:inline-flex text-muted-foreground hover:text-foreground"
				>
					<PanelRight className="-rotate-180 in-data-[sidebar-open=false]:rotate-0 opacity-100" />
				</Button>
			</div>
		</div>
	);
}
