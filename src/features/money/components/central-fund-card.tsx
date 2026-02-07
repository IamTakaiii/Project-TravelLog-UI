import { Wallet } from "lucide-react";

export function CentralFundCard() {
	return (
		<div className="bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 p-6 shadow-sm">
			<div className="flex items-center justify-between gap-3">
				<div className="flex items-center gap-3 flex-1 min-w-0">
					<div className="bg-amber-500/10 p-3 rounded-2xl shrink-0">
						<Wallet className="size-6 text-amber-600" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.2em]">
							Central Fund
						</p>
						<p className="text-3xl font-[800] tracking-tighter text-foreground">฿0</p>
					</div>
				</div>
				<div className="text-[10px] font-black text-amber-600/50 uppercase border border-amber-600/20 px-2.5 py-1 rounded-full whitespace-nowrap">
					Coming Soon
				</div>
			</div>
		</div>
	);
}
