import { Button } from "@/components/ui/button";

interface EmptyStateProps {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	actionLabel: string;
	onAction?: () => void;
}

export function EmptyState({
	icon: Icon,
	title,
	description,
	actionLabel,
	onAction,
}: EmptyStateProps) {
	return (
		<div className="bg-muted/20 border border-dashed border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4">
			<div className="bg-background p-4 rounded-full shadow-sm">
				<Icon className="size-8 text-muted-foreground/50" />
			</div>
			<div className="space-y-1">
				<h3 className="text-lg font-semibold">{title}</h3>
				<p className="text-muted-foreground max-w-md mx-auto">{description}</p>
			</div>
			<Button className="rounded-full mt-2" onClick={onAction}>
				{actionLabel}
			</Button>
		</div>
	);
}
