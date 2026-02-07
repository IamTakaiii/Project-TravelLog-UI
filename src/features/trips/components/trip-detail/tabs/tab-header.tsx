import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TabHeaderProps {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	actionLabel?: string;
	onAction?: () => void;
	actionVariant?: "primary" | "outline";
}

export function TabHeader({
	icon: Icon,
	title,
	actionLabel,
	onAction,
	actionVariant = "outline",
}: TabHeaderProps) {
	return (
		<div className="flex items-center justify-between">
			<h2 className="text-2xl font-bold flex items-center gap-2">
				<Icon className="size-6 text-primary" />
				{title}
			</h2>
			{actionLabel && (
				<Button
					variant={actionVariant}
					size="sm"
					className="gap-2 rounded-full"
					onClick={onAction}
				>
					<Plus className="size-4" />
					{actionLabel}
				</Button>
			)}
		</div>
	);
}
