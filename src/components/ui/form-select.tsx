import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormSelectProps<T extends FieldValues> {
	control: Control<T>;
	name: FieldPath<T>;
	label?: string;
	placeholder?: string;
	options: {
		label: string;
		value: string;
		disabled?: boolean;
		icon?: ReactNode;
	}[];
	className?: string;
	disabled?: boolean;
}

export function FormSelect<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	options,
	className,
	disabled,
}: FormSelectProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn("space-y-2", className)}>
					{label && (
						<FormLabel className="text-sm font-semibold flex items-center gap-2">
							{label}
						</FormLabel>
					)}
					<Select
						onValueChange={field.onChange}
						defaultValue={field.value}
						value={field.value}
						disabled={disabled}
					>
						<FormControl>
							<SelectTrigger className="h-12 bg-muted/30 border-border/50 focus:bg-background transition-colors">
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{options.map((option) => (
								<SelectItem
									key={option.value}
									value={option.value}
									disabled={option.disabled}
								>
									<div className="flex items-center gap-2">
										{option.icon}
										{option.label}
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
