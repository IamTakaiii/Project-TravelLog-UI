import { Control } from "react-hook-form";
import { CENTRAL_FUND_ID } from "../../constants/thresholds";
import { ExpenseFormValues } from "../../schemas/expense-schema";
import { FormSelect } from "@/components/ui/form-select";

interface PayerSelectProps {
	control: Control<ExpenseFormValues>;
}

export function PayerSelect({ control }: PayerSelectProps) {
	const payerOptions = [
		{ label: "Me", value: "u1" },
		{ label: "Ploy", value: "u2" },
		{ label: "Non", value: "u3" },
		{ 
			label: "Central Fund", 
			value: CENTRAL_FUND_ID,
		},
	];

	return (
		<div className="px-1">
			<FormSelect
				control={control}
				name="payerId"
				label="Who Paid?"
				options={payerOptions}
			/>
		</div>
	);
}

