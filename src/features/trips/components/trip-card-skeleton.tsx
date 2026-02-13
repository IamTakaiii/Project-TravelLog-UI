import { Skeleton } from "@/components/ui/skeleton";
import { ModernCard } from "@/components/common/modern-card";

export function TripCardSkeleton() {
	return (
		<ModernCard glass={false} className="p-0 overflow-hidden flex flex-col h-full">
			<Skeleton className="aspect-[4/3] rounded-none" />
			<div className="p-5 space-y-4 flex-1">
				<Skeleton className="h-6 w-3/4" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
				</div>
				<div className="pt-4 border-t border-border/50 flex justify-between">
					<div className="flex -space-x-2">
						<Skeleton className="size-6 rounded-full" />
						<Skeleton className="size-6 rounded-full" />
					</div>
					<Skeleton className="h-4 w-20" />
				</div>
			</div>
		</ModernCard>
	);
}
