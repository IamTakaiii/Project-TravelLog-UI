import { Skeleton } from "@/components/ui/skeleton";
import { ModernCard } from "@/components/common/modern-card";

export function StatCardSkeleton() {
	return (
		<ModernCard className="h-32 flex flex-col justify-between">
			<div className="flex justify-between items-start">
				<Skeleton className="size-12 rounded-2xl" />
				<Skeleton className="h-4 w-12 rounded-full" />
			</div>
			<div className="space-y-2">
				<Skeleton className="h-8 w-16" />
				<Skeleton className="h-4 w-24" />
			</div>
		</ModernCard>
	);
}

export function ExpenseCardSkeleton() {
	return (
		<div className="flex items-center gap-3 p-3 bg-card/30 rounded-2xl border border-border/50">
			<Skeleton className="size-11 rounded-xl shrink-0" />
			<div className="flex-1 space-y-2">
				<Skeleton className="h-4 w-1/2" />
				<Skeleton className="h-3 w-1/4" />
			</div>
			<div className="text-right space-y-2 shrink-0">
				<Skeleton className="h-5 w-16 ml-auto" />
				<Skeleton className="h-3 w-8 ml-auto" />
			</div>
		</div>
	);
}
