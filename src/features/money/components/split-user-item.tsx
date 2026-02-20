import { cn } from "@/lib/utils";
import { formatMoney } from "../utils/money-formatter";
import { CurrencyCode } from "../types";
import { Input } from "@/components/ui/input";

interface SplitUserItemProps {
    user: { id: string, name: string, avatar: string };
    isSelected: boolean;
    onToggle: () => void;
    splitType: "equal" | "exact";
    amount: number;
    currency: CurrencyCode;
    exactValue: string;
    onExactAmountChange: (value: string) => void;
}

export function SplitUserItem({
    user,
    isSelected,
    onToggle,
    splitType,
    amount,
    currency,
    exactValue,
    onExactAmountChange,
}: SplitUserItemProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-3 p-3 rounded-2xl border-2 transition-all",
                isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-muted/30"
            )}
        >
            <button
                type="button"
                onClick={onToggle}
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
                        {formatMoney(amount, currency)}
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
                        value={exactValue}
                        onChange={(e) => onExactAmountChange(e.target.value)}
                        className="h-9 pl-12 text-sm font-bold rounded-xl"
                    />
                </div>
            )}
        </div>
    );
}
