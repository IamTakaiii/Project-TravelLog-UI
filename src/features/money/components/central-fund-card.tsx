import { useState } from "react";
import { Wallet, Users, Coins, ReceiptText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CentralFundSheet } from "./central-fund-sheet";
import { fundsQueryOptions, fundsQueryKeys } from "../queries/fund-queries";
import { fundsApi } from "../api/funds-api";
import { tripQueryOptions } from "@/features/trips/queries/trips-queries";
import { getCurrencySymbol, formatMoney } from "../utils/money-formatter";
import { CurrencyCode } from "../types";
import { ModernCard } from "@/components/common/modern-card";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { toast } from "sonner";

import { Progress } from "@/components/ui/progress";

interface CentralFundCardProps {
	tripId: string;
	currency?: string;
}

export function CentralFundCard({ tripId, currency = "THB" }: CentralFundCardProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isDistributeOpen, setIsDistributeOpen] = useState(false);

	const { data: funds = [] } = useQuery(fundsQueryOptions(tripId));
	const { data: trip } = useQuery(tripQueryOptions(tripId));
	const { data: summary } = useQuery({
		queryKey: fundsQueryKeys.summary(tripId),
		queryFn: () => fundsApi.getSummary(tripId),
		enabled: !!tripId,
		refetchOnWindowFocus: true,
	});

	const totalAmount = funds
		.filter((f) => f.currency === currency)
		.reduce((sum, f) => sum + f.amount, 0);

	const membersCount = trip?.members?.length || 1;
	const amountPerPerson = totalAmount / membersCount;

	// Real values from the backend summary
	const totalSpent = summary?.totalSpent ?? 0;
	const remaining = summary?.remaining ?? totalAmount;
	const usagePercent = summary?.usagePercent ?? 0;

	const handleDistribute = () => {
		toast.success(`Distributed ${formatMoney(totalAmount, currency as CurrencyCode)} to ${membersCount} members`);
		setIsDistributeOpen(false);
	};

	return (
		<>
			<ModernCard
				className="cursor-pointer hover:bg-card/80 transition-all group space-y-6"
				onClick={() => setIsOpen(true)}
			>
				{/* Header Section */}
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-3 flex-1 min-w-0">
						<div className="bg-primary/10 p-3 rounded-2xl shrink-0 group-hover:scale-110 transition-transform">
							<Wallet className="size-6 text-primary" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">
								Central Fund
							</p>
							<div className="flex items-baseline gap-2">
								<p className="text-3xl font-[800] tracking-tighter text-foreground">
									{getCurrencySymbol(currency as CurrencyCode)}
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

					<Button
						size="sm"
						variant="primary"
						className="rounded-full h-9 w-9 sm:h-10 sm:w-auto sm:px-4 transition-all gap-2 shrink-0 p-0 sm:p-auto flex items-center justify-center shadow-md"
						onClick={(e) => {
							e.stopPropagation();
							setIsDistributeOpen(true);
						}}
						disabled={totalAmount <= 0}
					>
						<ReceiptText className="size-4" />
						<span className="font-bold hidden sm:inline">Distribute</span>
					</Button>


				</div>

				{/* Fund Usage — real data from backend */}
				<div className="space-y-3 pt-2 border-t border-border/40">
					<div className="space-y-2">
						<div className="flex justify-between items-center text-xs">
							<span className="font-bold text-muted-foreground">Fund Usage</span>
							<span className="font-black text-primary">{usagePercent}%</span>
						</div>
						<Progress value={usagePercent} className="h-2 bg-muted/50" indicatorClassName="bg-primary" />
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="bg-background/40 rounded-xl p-3 border border-border/30">
							<p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">
								Remaining
							</p>
							<p className="text-sm font-black text-emerald-500 truncate">
								{getCurrencySymbol(currency as CurrencyCode)}
								{remaining.toLocaleString(undefined, { maximumFractionDigits: 2 })}
							</p>
						</div>
						<div className="bg-background/40 rounded-xl p-3 border border-border/30">
							<p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">
								Spent
							</p>
							<p className="text-sm font-black text-foreground truncate">
								{getCurrencySymbol(currency as CurrencyCode)}
								{totalSpent.toLocaleString(undefined, { maximumFractionDigits: 2 })}
							</p>
						</div>
					</div>
				</div>
			</ModernCard>

			<CentralFundSheet
				tripId={tripId}
				currency={currency}
				open={isOpen}
				onOpenChange={setIsOpen}
			/>

			{/* Distribute Funds Dialog */}
			<ConfirmDialog
				open={isDistributeOpen}
				onOpenChange={setIsDistributeOpen}
				title="Distribute Funds?"
				description={
					<div className="space-y-4 pt-2">
						<p>You are about to refund the remaining central fund to all members.</p>
						<div className="bg-muted/50 rounded-2xl p-4 space-y-2 border border-border">
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Total to Distribute:</span>
								<span className="font-black text-foreground">{formatMoney(totalAmount, currency as CurrencyCode)}</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Members:</span>
								<div className="flex items-center gap-1 font-bold">
									<Users className="size-3" /> {membersCount}
								</div>
							</div>
							<div className="pt-2 border-t border-border flex justify-between items-center">
								<span className="font-bold text-primary">Each gets back:</span>
								<span className="text-xl font-black text-primary">{formatMoney(amountPerPerson, currency as CurrencyCode)}</span>
							</div>
						</div>
					</div>
				}
				confirmText="Confirm Distribution"
				onConfirm={handleDistribute}
				icon={<Coins className="size-7 text-primary" />}
				animation="none"
			/>
		</>
	);
}


