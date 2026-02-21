import { Users, DollarSign } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { formatMoney } from "../utils/money-formatter";
import { CurrencyCode } from "../types";
import { SplitUserItem } from "./split-user-item";

export interface SplitUser {
	id: string;
	name: string;
	avatar: string;
}

interface SplitConfigurationProps {
	totalAmount: number;
	currency: CurrencyCode;
	splitType: "equal" | "exact";
	onSplitTypeChange: (type: "equal" | "exact") => void;
	involvedUserIds: string[];
	onInvolvedUsersChange: (userIds: string[]) => void;
	exactAmounts: Record<string, number>;
	onExactAmountChange: (userId: string, amount: number) => void;
	users: SplitUser[];
	equalSplitAmount: number;
	exactTotal: number;
	isExactValid: boolean;
}

export function SplitConfiguration({
	totalAmount,
	currency,
	splitType,
	onSplitTypeChange,
	involvedUserIds,
	onInvolvedUsersChange,
	exactAmounts,
	onExactAmountChange,
	users,
	equalSplitAmount,
	exactTotal,
	isExactValid,
}: SplitConfigurationProps) {
	const toggleUser = (userId: string) => {
		if (involvedUserIds.includes(userId)) {
			if (involvedUserIds.length > 1) {
				onInvolvedUsersChange(involvedUserIds.filter((id) => id !== userId));
			}
		} else {
			onInvolvedUsersChange([...involvedUserIds, userId]);
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
					onValueChange={(value) =>
						onSplitTypeChange(value as "equal" | "exact")
					}
					className="grid grid-cols-2 gap-3"
				>
					<SplitTypeButton
						value="equal"
						label="Split Equally"
						description="Divide evenly"
						icon={<Users className="size-5 mb-2" />}
						active={splitType === "equal"}
					/>
					<SplitTypeButton
						value="exact"
						label="Exact Amounts"
						description="Custom split"
						icon={<DollarSign className="size-5 mb-2" />}
						active={splitType === "exact"}
					/>
				</RadioGroup>
			</div>

			{/* User Selection */}
			<div className="space-y-3">
				<Label className="text-xs font-black uppercase tracking-widest text-muted-foreground block">
					Who's Involved?
				</Label>
				<div className="space-y-2">
					{users.map((user) => (
						<SplitUserItem
							key={user.id}
							user={user}
							isSelected={involvedUserIds.includes(user.id)}
							onToggle={() => toggleUser(user.id)}
							splitType={splitType}
							amount={equalSplitAmount}
							currency={currency}
							exactValue={exactAmounts[user.id]?.toString() || ""}
							onExactAmountChange={(val) =>
								onExactAmountChange(user.id, parseFloat(val) || 0)
							}
						/>
					))}
				</div>
			</div>

			{/* Summary Blocks */}
			{splitType === "exact" && involvedUserIds.length > 0 && (
				<ExactSplitSummary
					isExactValid={isExactValid}
					exactTotal={exactTotal}
					totalAmount={totalAmount}
					currency={currency}
				/>
			)}

			{splitType === "equal" && involvedUserIds.length > 0 && (
				<EqualSplitSummary
					equalSplitAmount={equalSplitAmount}
					currency={currency}
				/>
			)}
		</div>
	);
}

// Internal Helper Components

function SplitTypeButton({
	value,
	label,
	description,
	icon,
	active,
}: {
	value: string;
	label: string;
	description: string;
	icon: React.ReactNode;
	active: boolean;
}) {
	return (
		<div>
			<RadioGroupItem value={value} id={value} className="peer sr-only" />
			<Label
				htmlFor={value}
				className={cn(
					"flex flex-col items-center justify-center rounded-2xl border-2 p-4 cursor-pointer transition-all",
					active
						? "border-primary bg-primary/5 shadow-inner"
						: "border-border bg-muted/30 hover:bg-muted/50"
				)}
			>
				{icon}
				<span className="text-sm font-bold">{label}</span>
				<span className="text-xs text-muted-foreground">{description}</span>
			</Label>
		</div>
	);
}

function ExactSplitSummary({
	isExactValid,
	exactTotal,
	totalAmount,
	currency,
}: {
	isExactValid: boolean;
	exactTotal: number;
	totalAmount: number;
	currency: CurrencyCode;
}) {
	return (
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
					{formatMoney(exactTotal, currency)}
				</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-xs font-bold text-muted-foreground uppercase">
					Expense Total
				</span>
				<span className="text-sm font-black text-foreground">
					{formatMoney(totalAmount, currency)}
				</span>
			</div>
			{!isExactValid && (
				<p className="text-xs text-destructive font-medium mt-2">
					⚠️ Amounts must sum to total expense
				</p>
			)}
		</div>
	);
}

function EqualSplitSummary({
	equalSplitAmount,
	currency,
}: {
	equalSplitAmount: number;
	currency: CurrencyCode;
}) {
	return (
		<div className="p-4 rounded-2xl border-2 border-primary/50 bg-primary/5">
			<div className="flex items-center justify-between">
				<span className="text-xs font-bold text-muted-foreground uppercase">
					Each Person Pays
				</span>
				<span className="text-lg font-black text-primary">
					{formatMoney(equalSplitAmount, currency)}
				</span>
			</div>
		</div>
	);
}
