import { Control } from "react-hook-form";
import { ExpenseFormValues } from "../../schemas/expense-schema";
import { FormSelect } from "@/components/ui/form-select";

interface UserInfo {
	id: string;
	name: string;
	avatar?: string;
}

interface PayerSelectProps {
	control: Control<ExpenseFormValues>;
	users: UserInfo[];
}

export function PayerSelect({ control, users }: PayerSelectProps) {
	const payerOptions = [
		...users.map((user) => ({
			label: user.name,
			value: user.id,
		})),
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

