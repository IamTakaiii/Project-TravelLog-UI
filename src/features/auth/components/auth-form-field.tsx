import {
	type FieldValues,
	type Path,
	type UseFormRegister,
	type FieldErrors,
} from "react-hook-form";
import { type LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTranslateError } from "@/hooks/use-translate-error";

interface AuthFormFieldProps<T extends FieldValues> {
	label: string;
	name: Path<T>;
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	icon: LucideIcon;
	placeholder: string;
	type?: string;
	isLoading?: boolean;
	autoComplete?: string;
	labelRight?: React.ReactNode;
	autoCapitalize?: string;
	autoCorrect?: string;
}

export function AuthFormField<T extends FieldValues>({
	label,
	name,
	register,
	errors,
	icon: Icon,
	placeholder,
	type = "text",
	isLoading,
	autoComplete,
	labelRight,
	autoCapitalize,
	autoCorrect,
}: AuthFormFieldProps<T>) {
	const { translateError } = useTranslateError();
	const error = errors[name];

	return (
		<div className="grid gap-2">
			<div className="flex items-center justify-between">
				<Label htmlFor={name} className="text-sm font-medium">
					{label}
				</Label>
				{labelRight}
			</div>
			<div className="relative">
				<Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
				<Input
					id={name}
					placeholder={placeholder}
					type={type}
					autoCapitalize={autoCapitalize}
					autoComplete={autoComplete}
					autoCorrect={autoCorrect}
					disabled={isLoading}
					{...register(name)}
					className={cn(
						"pl-10 h-12 bg-muted/30 border-border/50 focus:bg-background transition-colors",
						error && "border-destructive focus-visible:ring-destructive/30"
					)}
				/>
			</div>
			{error?.message && (
				<p className="text-sm text-destructive flex items-center gap-1.5">
					<span className="inline-block w-1 h-1 rounded-full bg-destructive" />
					{/* @ts-ignore - message type is string */}
					{translateError(error.message as string)}
				</p>
			)}
		</div>
	);
}
