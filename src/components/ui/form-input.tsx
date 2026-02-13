import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormInputProps<T extends FieldValues> {
	control: Control<T>;
	name: FieldPath<T>;
	label?: string;
	placeholder?: string;
	type?: string;
	icon?: ReactNode;
	className?: string;
	disabled?: boolean;
	required?: boolean;
}

export function FormInput<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	type = "text",
	icon,
	className,
	disabled,
}: FormInputProps<T>) {
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
					<div className="relative">
						{icon && (
							<div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
								{icon}
							</div>
						)}
						<FormControl>
							<Input
								{...field}
								type={type}
								placeholder={placeholder}
								disabled={disabled}
								className={cn(icon && "pl-10", "h-12 bg-muted/30 border-border/50 focus:bg-background")}
							/>
						</FormControl>
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
