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
		<div className={cn("relative flex items-center w-full max-w-md", className)}>
			<div className="absolute left-3 flex items-center justify-center pointer-events-none text-muted-foreground">
				<Search className="size-4" />
			</div>
			<Input
				placeholder={placeholder}
				className="pl-10 h-11 rounded-xl bg-background border-border/60 shadow-sm focus:shadow-md focus:border-primary/50 transition-all"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			{value && onClear && (
				<button
					onClick={onClear}
					className="absolute right-3 flex items-center justify-center hover:bg-muted rounded-full p-1 transition-colors"
				>
					<X className="size-4 text-muted-foreground" />
				</button>
			)}
		</div>
	);
}
