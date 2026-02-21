import { Control, useWatch } from "react-hook-form";
import { ExpenseFormValues } from "../../schemas/expense-schema";
import { FormSelect } from "@/components/ui/form-select";
import { Fund } from "../../types";
import { Landmark } from "lucide-react";

interface UserInfo {
	id: string;
	name: string;
}

interface PayerSelectProps {
	control: Control<ExpenseFormValues>;
	users: UserInfo[];
	funds?: Fund[];
}

/**
 * Payer selector supporting both trip members and central funds.
 *
 * Fund options use a "fund:<id>" prefix so the form can distinguish
 * between a user payer and a fund payer without a separate field.
 * The prefix is resolved back to `payerFundId` in `expenses-api.ts`.
 */
export function PayerSelect({ control, users, funds }: PayerSelectProps) {
	const payerOptions = [
		...users.map((u) => ({ label: u.name, value: u.id, icon: undefined })),
		...(funds ?? []).map((f) => ({
			label: `${f.title} (Fund)`,
			value: `fund:${f.id}`,
		})),
	];

	const selectedPayer = useWatch({ control, name: "payerId" });
	const isFund = selectedPayer?.startsWith("fund:");

	return (
		<div className="px-1 space-y-2">
			<FormSelect
				control={control}
				name="payerId"
				label="Who Paid?"
				options={payerOptions}
			/>
			{isFund && (
				<p className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium px-1">
					<Landmark className="size-3.5" />
					Paid from central fund — no personal debt recorded
				</p>
			)}
		</div>
	);
}
