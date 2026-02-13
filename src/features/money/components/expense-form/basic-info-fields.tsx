import { Control } from "react-hook-form";
import { MapPin } from "lucide-react";
import { ExpenseFormValues } from "../../schemas/expense-schema";
import { FormInput } from "@/components/ui/form-input";

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
				<FormInput
					control={control}
					name="placeName"
					label="Where was this?"
					placeholder="Location (Optional)"
					icon={<MapPin className="size-3" />}
				/>
			)}
		</div>
	);
}

