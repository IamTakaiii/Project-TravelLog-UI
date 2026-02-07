import { useState, useEffect } from "react";
import { Users, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { formatMoney } from "../utils/money-utils";

interface SplitConfigurationProps {
	totalAmount: number;
	currency: string;
	splitType: "equal" | "exact";
	onSplitTypeChange: (type: "equal" | "exact") => void;
	involvedUserIds: string[];
	onInvolvedUsersChange: (userIds: string[]) => void;
	exactAmounts?: Record<string, number>;
	onExactAmountsChange?: (amounts: Record<string, number>) => void;
}

const MOCK_USERS = [
	{ id: "u1", name: "Me", avatar: "👤" },
	{ id: "u2", name: "Ploy", avatar: "👩" },
	{ id: "u3", name: "Non", avatar: "👨" },
];

export function SplitConfiguration({
	totalAmount,
	currency,
	splitType,
	onSplitTypeChange,
	involvedUserIds,
	onInvolvedUsersChange,
	exactAmounts = {},
	onExactAmountsChange,
}: SplitConfigurationProps) {
	const [localAmounts, setLocalAmounts] = useState<Record<string, number>>(
		exactAmounts
	);

	// Calculate equal split amount
	const equalSplitAmount =
		involvedUserIds.length > 0 ? totalAmount / involvedUserIds.length : 0;

	// Calculate total of exact amounts
	const exactTotal = Object.values(localAmounts).reduce(
		(sum, amt) => sum + (amt || 0),
		0
	);
	const isExactValid = Math.abs(exactTotal - totalAmount) < 0.01;

	// Initialize amounts when switching to exact mode
	useEffect(() => {
		if (splitType === "exact") {
			const newAmounts: Record<string, number> = {};
			involvedUserIds.forEach((userId) => {
				newAmounts[userId] = exactAmounts[userId] || 0;
			});
			setLocalAmounts(newAmounts);
		}
	}, [splitType]); // Only run when splitType changes

	// Update amounts when users are added/removed in exact mode
	useEffect(() => {
		if (splitType === "exact") {
			setLocalAmounts((prev) => {
				const newAmounts: Record<string, number> = {};
				involvedUserIds.forEach((userId) => {
					newAmounts[userId] = prev[userId] || 0;
				});
				return newAmounts;
			});
		}
	}, [involvedUserIds.join(","), splitType]); // Use join to avoid array reference issues

	const toggleUser = (userId: string) => {
		if (involvedUserIds.includes(userId)) {
			if (involvedUserIds.length > 1) {
				onInvolvedUsersChange(involvedUserIds.filter((id) => id !== userId));
			}
		} else {
			onInvolvedUsersChange([...involvedUserIds, userId]);
		}
	};

	const handleExactAmountChange = (userId: string, value: string) => {
		const amount = parseFloat(value) || 0;
		const newAmounts = {
			...localAmounts,
			[userId]: amount,
		};
		setLocalAmounts(newAmounts);
		
		// Notify parent immediately
		if (onExactAmountsChange) {
			onExactAmountsChange(newAmounts);
		}
	};

	return (
		<div className="space-y-6 px-1">
			{/* Split Type Selection */}
			<div>
				<Label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 block">
					<Users className="size-3 inline mr-1" />
					How to Split?
				</Label>
				<RadioGroup
					value={splitType}
					onValueChange={(value) => onSplitTypeChange(value as "equal" | "exact")}
					className="grid grid-cols-2 gap-3"
				>
					<div>
						<RadioGroupItem
							value="equal"
							id="equal"
							className="peer sr-only"
						/>
						<Label
							htmlFor="equal"
							className={cn(
								"flex flex-col items-center justify-center rounded-2xl border-2 p-4 cursor-pointer transition-all",
								splitType === "equal"
									? "border-primary bg-primary/5 shadow-inner"
									: "border-border bg-muted/30 hover:bg-muted/50"
							)}
						>
							<Users className="size-5 mb-2" />
							<span className="text-sm font-bold">Split Equally</span>
							<span className="text-xs text-muted-foreground">
								Divide evenly
							</span>
						</Label>
					</div>
					<div>
						<RadioGroupItem value="exact" id="exact" className="peer sr-only" />
						<Label
							htmlFor="exact"
							className={cn(
								"flex flex-col items-center justify-center rounded-2xl border-2 p-4 cursor-pointer transition-all",
								splitType === "exact"
									? "border-primary bg-primary/5 shadow-inner"
									: "border-border bg-muted/30 hover:bg-muted/50"
							)}
						>
							<DollarSign className="size-5 mb-2" />
							<span className="text-sm font-bold">Exact Amounts</span>
							<span className="text-xs text-muted-foreground">
								Custom split
							</span>
						</Label>
					</div>
				</RadioGroup>
			</div>

			{/* User Selection */}
			<div>
				<Label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3 block">
					Who's Involved?
				</Label>
				<div className="space-y-2">
					{MOCK_USERS.map((user) => {
						const isSelected = involvedUserIds.includes(user.id);
						const userAmount =
							splitType === "equal"
								? equalSplitAmount
								: localAmounts[user.id] || 0;

						return (
							<div
								key={user.id}
								className={cn(
									"flex items-center gap-3 p-3 rounded-2xl border-2 transition-all",
									isSelected
										? "border-primary bg-primary/5"
										: "border-border bg-muted/30"
								)}
							>
								<button
									type="button"
									onClick={() => toggleUser(user.id)}
									className={cn(
										"size-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
										isSelected
											? "border-primary bg-primary"
											: "border-muted-foreground/30"
									)}
								>
									{isSelected && (
										<svg
											className="size-4 text-white"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={3}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									)}
								</button>

								<span className="text-2xl">{user.avatar}</span>

								<div className="flex-1 min-w-0">
									<p className="font-bold text-sm">{user.name}</p>
									{isSelected && splitType === "equal" && (
										<p className="text-xs text-muted-foreground">
											{formatMoney(userAmount, currency as any)}
										</p>
									)}
								</div>

								{isSelected && splitType === "exact" && (
									<div className="relative w-28">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-bold">
											{currency}
										</span>
										<Input
											type="number"
											step="0.01"
											placeholder="0.00"
											value={localAmounts[user.id] || ""}
											onChange={(e) =>
												handleExactAmountChange(user.id, e.target.value)
											}
											className="h-9 pl-12 text-sm font-bold rounded-xl"
										/>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Exact Split Summary */}
			{splitType === "exact" && involvedUserIds.length > 0 && (
				<div
					className={cn(
						"p-4 rounded-2xl border-2 transition-all",
						isExactValid
							? "border-emerald-500/50 bg-emerald-500/5"
							: "border-destructive/50 bg-destructive/5"
					)}
				>
					<div className="flex items-center justify-between mb-2">
						<span className="text-xs font-bold text-muted-foreground uppercase">
							Total Split
						</span>
						<span
							className={cn(
								"text-sm font-black",
								isExactValid ? "text-emerald-500" : "text-destructive"
							)}
						>
							{formatMoney(exactTotal, currency as any)}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-xs font-bold text-muted-foreground uppercase">
							Expense Total
						</span>
						<span className="text-sm font-black text-foreground">
							{formatMoney(totalAmount, currency as any)}
						</span>
					</div>
					{!isExactValid && (
						<p className="text-xs text-destructive font-medium mt-2">
							⚠️ Amounts must sum to total expense
						</p>
					)}
				</div>
			)}

			{/* Equal Split Summary */}
			{splitType === "equal" && involvedUserIds.length > 0 && (
				<div className="p-4 rounded-2xl border-2 border-primary/50 bg-primary/5">
					<div className="flex items-center justify-between">
						<span className="text-xs font-bold text-muted-foreground uppercase">
							Each Person Pays
						</span>
						<span className="text-lg font-black text-primary">
							{formatMoney(equalSplitAmount, currency as any)}
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
