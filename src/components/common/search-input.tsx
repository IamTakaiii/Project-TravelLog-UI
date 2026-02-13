import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	onClear?: () => void;
	placeholder?: string;
	className?: string;
}

export function SearchInput({
	value,
	onChange,
	onClear,
	placeholder = "Search...",
	className,
}: SearchInputProps) {
	return (
		<div className={cn("relative w-full max-w-md", className)}>
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input
				placeholder={placeholder}
				className="pl-10 h-11 rounded-xl bg-background border-border/60 shadow-sm focus:shadow-md focus:border-primary/50 transition-all"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			{value && onClear && (
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
