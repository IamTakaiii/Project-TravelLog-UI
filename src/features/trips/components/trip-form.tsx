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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useTranslateError } from "@/hooks/use-translate-error";
import { UseFormReturn, Controller } from "react-hook-form";
import { CreateTripFormValues } from "../schemas/create-trip-schema";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

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
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = form;

	return (
		<div className="w-full">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{/* Error Message */}
				{error && (
					<div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3 animate-in slide-in-from-top-2">
						<AlertCircle className="size-5 text-destructive shrink-0 mt-0.5" />
						<p className="text-sm text-destructive">{translateError(error)}</p>
					</div>
				)}

				{/* Trip Title */}
				<div className="space-y-2">
					<Label
						htmlFor="title"
						className="text-sm font-semibold flex items-center gap-2"
					>
						<Sparkles className="size-4 text-primary" />
						{t("trips.fields.title")}
					</Label>
					<Input
						id="title"
						placeholder={t("trips.placeholders.title")}
						type="text"
						disabled={isLoading}
						{...register("title")}
						className={cn(
							"h-12 bg-muted/30 border-border/50 focus:bg-background transition-colors",
							errors.title &&
								"border-destructive focus-visible:ring-destructive/30"
						)}
					/>
					{errors.title?.message && (
						<p className="text-sm text-destructive flex items-center gap-1.5">
							<AlertCircle className="size-3.5" />
							{translateError(errors.title.message)}
						</p>
					)}
				</div>

				<div className="space-y-4">
					<Label className="text-sm font-semibold flex items-center gap-2">
						<MapPin className="size-4 text-primary" />
						{t("trips.fields.destination")}
					</Label>

					<div className="flex flex-col md:flex-row gap-4">
						<div className="w-full md:w-1/3">
							<Controller
								control={control}
								name="destinationType"
								render={({ field }) => (
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										value={field.value}
										disabled={isLoading}
									>
										<SelectTrigger className="h-12 bg-muted/30 border-border/50 focus:bg-background transition-colors">
											<SelectValue
												placeholder={t("trips.destination_types.unknown")}
											/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem
												value="unknown"
												disabled
												className="text-muted-foreground opacity-50"
											>
												{t("trips.destination_types.unknown")}
											</SelectItem>
											<SelectItem value="country">
												{t("trips.destination_types.country")}
											</SelectItem>
											<SelectItem value="city">
												{t("trips.destination_types.city")}
											</SelectItem>
											<SelectItem value="province">
												{t("trips.destination_types.province")}
											</SelectItem>
											<SelectItem value="island">
												{t("trips.destination_types.island")}
											</SelectItem>
											<SelectItem value="other">
												{t("trips.destination_types.other")}
											</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
						</div>
						<div className="w-full md:w-2/3 relative">
							<MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
							<Input
								id="destination"
								placeholder={t("trips.placeholders.destination")}
								type="text"
								disabled={isLoading}
								{...register("destination")}
								className={cn(
									"pl-10 h-12 bg-muted/30 border-border/50 focus:bg-background transition-colors",
									errors.destination &&
										"border-destructive focus-visible:ring-destructive/30"
								)}
							/>
						</div>
					</div>
					{errors.destination?.message && (
						<p className="text-sm text-destructive flex items-center gap-1.5">
							<AlertCircle className="size-3.5" />
							{translateError(errors.destination.message)}
						</p>
					)}
				</div>

				{/* Date Range */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Start Date */}
					<div className="space-y-2">
						<Label
							htmlFor="startDate"
							className="text-sm font-semibold flex items-center gap-2"
						>
							<Calendar className="size-4 text-primary" />
							{t("trips.fields.start_date")}
						</Label>
						<div className="relative">
							<Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
							<Input
								id="startDate"
								type="date"
								disabled={isLoading}
								{...register("startDate")}
								className={cn(
									"pl-10 h-12 bg-muted/30 border-border/50 focus:bg-background transition-colors",
									errors.startDate &&
										"border-destructive focus-visible:ring-destructive/30"
								)}
							/>
						</div>
						{errors.startDate?.message && (
							<p className="text-sm text-destructive flex items-center gap-1.5">
								<AlertCircle className="size-3.5" />
								{translateError(errors.startDate.message)}
							</p>
						)}
					</div>

					{/* End Date */}
					<div className="space-y-2">
						<Label
							htmlFor="endDate"
							className="text-sm font-semibold flex items-center gap-2"
						>
							<Calendar className="size-4 text-primary" />
							{t("trips.fields.end_date")}
						</Label>
						<div className="relative">
							<Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
							<Input
								id="endDate"
								type="date"
								disabled={isLoading}
								{...register("endDate")}
								className={cn(
									"pl-10 h-12 bg-muted/30 border-border/50 focus:bg-background transition-colors",
									errors.endDate &&
										"border-destructive focus-visible:ring-destructive/30"
								)}
							/>
						</div>
						{errors.endDate?.message && (
							<p className="text-sm text-destructive flex items-center gap-1.5">
								<AlertCircle className="size-3.5" />
								{translateError(errors.endDate.message)}
							</p>
						)}
					</div>
				</div>

				{/* Budget & Currency */}
				<div className="flex flex-col md:flex-row gap-4">
					<div className="w-full md:w-1/3 space-y-2">
						<Label className="text-sm font-semibold flex items-center gap-2">
							<DollarSign className="size-4 text-primary" />
							Currency
						</Label>
						<Controller
							control={control}
							name="currency"
							defaultValue="USD"
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									value={field.value}
									disabled={isLoading}
								>
									<SelectTrigger className="h-12 bg-muted/30 border-border/50 focus:bg-background transition-colors">
										<SelectValue placeholder="Select Currency" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="USD">USD ($)</SelectItem>
										<SelectItem value="THB">THB (฿)</SelectItem>
										<SelectItem value="EUR">EUR (€)</SelectItem>
										<SelectItem value="GBP">GBP (£)</SelectItem>
										<SelectItem value="JPY">JPY (¥)</SelectItem>
										<SelectItem value="CNY">CNY (¥)</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>

					<div className="w-full md:w-2/3 space-y-2">
						<Label
							htmlFor="budget"
							className="text-sm font-semibold flex items-center gap-2"
						>
							<DollarSign className="size-4 text-muted-foreground" />
							{t("trips.fields.budget")}{" "}
							<span className="text-xs font-normal text-muted-foreground">
								({t("trips.create.optional")})
							</span>
						</Label>
						<div className="relative">
							<DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
							<Input
								id="budget"
								placeholder={t("trips.placeholders.budget")}
								type="text"
								disabled={isLoading}
								{...register("budget")}
								className="pl-10 h-12 bg-muted/30 border-border/50 focus:bg-background transition-colors"
							/>
						</div>
					</div>
				</div>

				{/* Description */}
				<div className="space-y-2">
					<Label
						htmlFor="description"
						className="text-sm font-semibold flex items-center gap-2"
					>
						<FileText className="size-4 text-muted-foreground" />
						{t("trips.fields.description")}{" "}
						<span className="text-xs font-normal text-muted-foreground">
							({t("trips.create.optional")})
						</span>
					</Label>
					<textarea
						id="description"
						placeholder={t("trips.placeholders.description")}
						disabled={isLoading}
						{...register("description")}
						rows={4}
						className={cn(
							"w-full px-3 py-3 rounded-md bg-muted/30 border border-border/50 focus:bg-background transition-colors",
							"text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
							"disabled:cursor-not-allowed disabled:opacity-50"
						)}
					/>
				</div>

				{/* Submit Button */}
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
		</div>
	);
}
