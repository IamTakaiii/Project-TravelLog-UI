import { useState } from "react";
import { Wallet } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CentralFundSheet } from "./central-fund-sheet";
import { fundsQueryOptions } from "../queries/fund-queries";
import { DEFAULT_CURRENCIES } from "../utils/money-utils";

import { Progress } from "@/components/ui/progress";

interface CentralFundCardProps {
	tripId: string;
	currency?: string;
}

export function CentralFundCard({ tripId, currency = "THB" }: CentralFundCardProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { data: funds = [] } = useQuery(fundsQueryOptions(tripId));

	// Calculate total in base currency (simplified: just sum amounts for now if same currency or display main currency)
	// For now let's just show the SUM of the trip's main currency funds, or 0.
	const totalAmount = funds
		.filter((f) => f.currency === currency)
		.reduce((sum, f) => sum + f.amount, 0);

	// Mock data for UI demonstration
	const mockSpent = totalAmount * 0.45;
	const mockRemaining = totalAmount - mockSpent;
	const mockPercentage = 45;

	return (
		<>
			<div
				className="bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 p-6 shadow-sm cursor-pointer hover:bg-card/80 transition-all group space-y-6"
				onClick={() => setIsOpen(true)}
			>
				{/* Header Section */}
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-3 flex-1 min-w-0">
						<div className="bg-amber-500/10 p-3 rounded-2xl shrink-0 group-hover:scale-110 transition-transform">
							<Wallet className="size-6 text-amber-600" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.2em] mb-1">
								Central Fund
							</p>
							<div className="flex items-baseline gap-2">
								<p className="text-3xl font-[800] tracking-tighter text-foreground">
									{(DEFAULT_CURRENCIES as any)[currency]?.symbol}
									{totalAmount.toLocaleString()}
								</p>
								{funds.length > 0 && (
									<span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
										{funds.length} Pots
									</span>
								)}
							</div>
						</div>
					</div>

				</div>

				{/* Budget Summary Mock API */}
				<div className="space-y-3 pt-2 border-t border-border/40">
					<div className="space-y-2">
						<div className="flex justify-between items-center text-xs">
							<span className="font-bold text-muted-foreground">Fund Usage</span>
							<span className="font-black text-amber-600">{mockPercentage}%</span>
						</div>
						<Progress value={mockPercentage} className="h-2 bg-muted/50" indicatorClassName="bg-amber-500" />
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="bg-background/40 rounded-xl p-3 border border-border/30">
							<p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">
								Remaining
							</p>
							<p className="text-sm font-black text-emerald-500 truncate">
								{(DEFAULT_CURRENCIES as any)[currency]?.symbol}
								{mockRemaining.toLocaleString()}
							</p>
						</div>
						<div className="bg-background/40 rounded-xl p-3 border border-border/30">
							<p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">
								Spent
							</p>
							<p className="text-sm font-black text-foreground truncate">
								{(DEFAULT_CURRENCIES as any)[currency]?.symbol}
								{mockSpent.toLocaleString()}
							</p>
						</div>
					</div>
				</div>
			</div>

			<CentralFundSheet
				tripId={tripId}
				currency={currency}
				open={isOpen}
				onOpenChange={setIsOpen}
			/>
		</>
	);
}
