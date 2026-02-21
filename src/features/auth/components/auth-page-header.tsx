import { PageHeader } from "@/components/common/page-header";
import type { LucideIcon } from "lucide-react";

interface AuthPageHeaderProps {
	badge?: {
		icon?: LucideIcon;
		text: string;
		variant?: "primary" | "accent" | "muted";
		animated?: boolean;
	};
	title: string;
	description: string;
}

export function AuthPageHeader({
	badge,
	title,
	description,
}: AuthPageHeaderProps) {
	const getBadgeClassName = () => {
		switch (badge?.variant) {
			case "accent":
				return "bg-accent/10 text-accent border-accent/20";
			case "muted":
				return "bg-muted text-muted-foreground border-border";
			case "primary":
			default:
				return "bg-primary/10 text-primary border-primary/20";
		}
	};

	return (
		<PageHeader
			className="text-center lg:text-left"
			badge={
				badge
					? {
							icon: badge.icon,
							text: badge.text,
							className: getBadgeClassName(),
							animated: badge.animated,
						}
					: undefined
			}
			title={title}
			description={description}
		/>
	);
}
