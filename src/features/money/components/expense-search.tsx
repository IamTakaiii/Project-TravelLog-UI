import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ExpenseSearchProps {
	value: string;
	onChange: (value: string) => void;
	onClear: () => void;
}

export function ExpenseSearch({ value, onChange, onClear }: ExpenseSearchProps) {
	return (
		<div className="relative w-full max-w-md">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input
				placeholder="Search expenses..."
				className="pl-10 h-11 rounded-xl bg-background border-border/60 shadow-sm focus:shadow-md focus:border-primary/50 transition-all"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			{value && (
				<button
					onClick={onClear}
					className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-muted rounded-full p-1 transition-colors"
				>
					<X className="size-4 text-muted-foreground" />
				</button>
			)}
		</div>
	);
}
