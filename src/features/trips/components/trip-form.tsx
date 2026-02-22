import {
	MapPin,
	Calendar,
	FileText,
	DollarSign,
	Loader2,
	Sparkles,
	AlertCircle,
	Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useTranslateError } from "@/hooks/use-translate-error";
import { UseFormReturn } from "react-hook-form";
import { CreateTripFormValues } from "../schemas/create-trip-schema";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { Form } from "@/components/ui/form";
import { getDestinationTypeOptions, currencyOptions } from "../utils/options";
import { FormTextarea } from "@/components/ui/form-textarea";

interface TripFormProps {
	form: UseFormReturn<CreateTripFormValues>;
	onSubmit: (data: CreateTripFormValues) => void;
	isLoading: boolean;
	error: string | null;
	isEditMode?: boolean;
}

export function TripForm({
	form,
	onSubmit,
	isLoading,
	error,
	isEditMode = false,
}: TripFormProps) {
	const { t } = useTranslation();
	const { translateError } = useTranslateError();
	const { control, handleSubmit } = form;

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{/* Error Message */}
				{error && (
					<div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3 animate-in slide-in-from-top-2">
						<AlertCircle className="size-5 text-destructive shrink-0 mt-0.5" />
						<p className="text-sm text-destructive">{translateError(error)}</p>
					</div>
				)}

				<FormInput
					control={control}
					name="title"
					label={t("trips.fields.title")}
					placeholder={t("trips.placeholders.title")}
					icon={<Sparkles className="size-4 text-primary" />}
					disabled={isLoading}
				/>

				<div className="space-y-4">
					<Label className="text-sm font-semibold flex items-center gap-2">
						<MapPin className="size-4 text-primary" />
						{t("trips.fields.destination")}
					</Label>

					<div className="flex flex-col md:flex-row gap-4">
						<FormSelect
							className="w-full md:w-1/3"
							control={control}
							name="destinationType"
							placeholder={t("trips.destination_types.unknown")}
							options={getDestinationTypeOptions(t)}
							disabled={isLoading}
						/>
						<FormInput
							className="grow"
							control={control}
							name="destination"
							placeholder={t("trips.placeholders.destination")}
							icon={<MapPin className="size-4" />}
							disabled={isLoading}
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormInput
						control={control}
						name="startDate"
						type="date"
						label={t("trips.fields.start_date")}
						icon={<Calendar className="size-4" />}
						disabled={isLoading}
					/>
					<FormInput
						control={control}
						name="endDate"
						type="date"
						label={t("trips.fields.end_date")}
						icon={<Calendar className="size-4" />}
						disabled={isLoading}
					/>
				</div>

				<div className="flex flex-col md:flex-row gap-4">
					<FormSelect
						className="w-full md:w-1/3"
						control={control}
						name="currency"
						label="Currency"
						options={currencyOptions}
						disabled={isLoading || isEditMode}
					/>

					<FormInput
						className="grow"
						control={control}
						name="budget"
						label={t("trips.fields.budget")}
						placeholder={t("trips.placeholders.budget")}
						icon={<DollarSign className="size-4" />}
						disabled={isLoading}
					/>
				</div>

				<FormTextarea
					control={control}
					name="description"
					label={t("trips.fields.description")}
					placeholder={t("trips.placeholders.description")}
					icon={<FileText className="size-4 text-muted-foreground" />}
					disabled={isLoading}
				/>

				<div className="pt-4">
					<Button
						type="submit"
						size="lg"
						disabled={isLoading}
						className="w-full h-12 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
					>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 size-5 animate-spin" />
								{isEditMode
									? t("trips.edit.submitting")
									: t("trips.create.submitting")}
							</>
						) : (
							<>
								{isEditMode ? (
									<Save className="mr-2 size-5" />
								) : (
									<Sparkles className="mr-2 size-5" />
								)}
								{isEditMode
									? t("trips.edit.submit_button")
									: t("trips.create.submit_button")}
							</>
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
}
