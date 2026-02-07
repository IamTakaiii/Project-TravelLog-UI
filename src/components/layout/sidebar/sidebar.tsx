import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarPrimaryMenu } from "./sidebar-primary-menu";
import { Button } from "@/components/ui/button";
import { Sparkles, Map } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Sidebar() {
	const { t } = useTranslation();

	return (
		<aside className="fixed top-(--header-height) start-0 bottom-0 transition-all duration-300 flex flex-col items-stretch flex-shrink-0 w-(--sidebar-width) in-data-[sidebar-open=false]:-start-full border-e border-border/60 bg-background/50 backdrop-blur-md">
			<ScrollArea className="grow mt-2 lg:mt-4">
				<SidebarPrimaryMenu />
			</ScrollArea>

			{/* Sidebar Footer Widget */}
			<div className="p-4 pb-6 mt-auto">
				<div className="rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 p-4 relative overflow-hidden group hover:border-primary/20 transition-all cursor-pointer">
					{/* Decorative Elements */}
					<div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors"></div>
					<div className="absolute -left-4 -bottom-4 h-20 w-20 rounded-full bg-accent/10 blur-xl group-hover:bg-accent/20 transition-colors"></div>

					<div className="relative z-10">
						<div className="flex items-center gap-2 mb-2">
							<div className="p-1.5 rounded-lg bg-background/80 shadow-sm text-primary">
								<Sparkles className="size-4" />
							</div>
							<span className="font-semibold text-sm">
								{t("menu.pro_features.title")}
							</span>
						</div>
						<p className="text-xs text-muted-foreground mb-3 leading-relaxed">
							{t("menu.pro_features.description")}
						</p>
						<Button
							size="sm"
							className="w-full text-xs font-semibold shadow-sm rounded-lg"
							variant="outline"
						>
							{t("menu.pro_features.upgrade")}
						</Button>
					</div>
				</div>

				<div className="mt-6 flex flex-col gap-1 px-2">
					<div className="flex items-center gap-2 text-[10px] items-center text-muted-foreground/50 font-medium">
						<Map className="size-3" />
						<span>Travel Log v1.0.2</span>
					</div>
				</div>
			</div>
		</aside>
	);
}
