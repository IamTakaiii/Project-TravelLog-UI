import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CENTRAL_FUND_ID } from "../../constants/thresholds";
import { ExpenseFormValues } from "../../schemas/expense-schema";

interface PayerSelectProps {
	control: Control<ExpenseFormValues>;
}

export function PayerSelect({ control }: PayerSelectProps) {
	return (
		<div className="px-1">
			<FormField
				control={control}
				name="payerId"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">
							Who Paid?
						</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger className="h-12 rounded-2xl bg-muted/20 border-border/50">
									<SelectValue />
								</SelectTrigger>
							</FormControl>
							<SelectContent className="rounded-2xl border-border/50 shadow-xl">
								<SelectItem value="u1" className="rounded-xl">👤 Me</SelectItem>
								<SelectItem value="u2" className="rounded-xl">👩 Ploy</SelectItem>
								<SelectItem value="u3" className="rounded-xl">👨 Non</SelectItem>
								<SelectItem
									value={CENTRAL_FUND_ID}
									className="rounded-xl font-bold text-amber-600"
								>
									💰 Central Fund
								</SelectItem>
							</SelectContent>
						</Select>
					</FormItem>
				)}
			/>
		</div>
	);
}
