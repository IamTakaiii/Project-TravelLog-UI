import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormTextareaProps<T extends FieldValues> {
	control: Control<T>;
	name: FieldPath<T>;
	label?: string;
	placeholder?: string;
	rows?: number;
	className?: string;
	disabled?: boolean;
	icon?: ReactNode;
}

export function FormTextarea<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	rows = 4,
	className,
	disabled,
	icon,
}: FormTextareaProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn("space-y-2", className)}>
					{label && (
						<FormLabel className="text-sm font-semibold flex items-center gap-2">
							{icon}
							{label}
						</FormLabel>
					)}
					<FormControl>
						<textarea
							{...field}
							placeholder={placeholder}
							disabled={disabled}
							rows={rows}
							className={cn(
								"w-full px-3 py-3 rounded-md bg-muted/30 border border-border/50 focus:bg-background transition-colors",
								"text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
								"disabled:cursor-not-allowed disabled:opacity-50"
							)}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
