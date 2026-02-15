import { Control } from "react-hook-form";
import { ExpenseFormValues } from "../../schemas/expense-schema";
import { FormInput } from "@/components/ui/form-input";
import { PlaceAutocomplete } from "@/components/common/place-autocomplete";

interface BasicInfoFieldsProps {
	control: Control<ExpenseFormValues>;
	mode: "quick" | "standard";
}

export function BasicInfoFields({ control, mode }: BasicInfoFieldsProps) {
	return (
		<div className="space-y-4 px-1">
			<FormInput
				control={control}
				name="description"
				label="What did you buy?"
				placeholder="e.g. Sushi Dinner"
			/>

			{mode === "standard" && (
				<PlaceAutocomplete
					control={control}
					name="placeName"
					label="Where was this?"
				/>
			)}
		</div>
	);
}

