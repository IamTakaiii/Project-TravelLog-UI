import {
	MapPin,
	Calendar,
	FileText,
	DollarSign,
	Users,
	Loader2,
	Sparkles,
	AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useCreateTrip } from "../hooks/use-create-trip";
import { useTranslation } from "react-i18next";
import { useTranslateError } from "@/hooks/use-translate-error";

export function CreateTripForm() {
	const { t } = useTranslation();
	const { translateError } = useTranslateError();
	const { form, isLoading, error, onSubmit } = useCreateTrip();
	const {
		register,
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

				{/* Destination */}
				<div className="space-y-2">
					<Label
						htmlFor="destination"
						className="text-sm font-semibold flex items-center gap-2"
					>
						<MapPin className="size-4 text-primary" />
						{t("trips.fields.destination")}
					</Label>
					<div className="relative">
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

				{/* Optional Fields */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Budget */}
					<div className="space-y-2">
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

					{/* Number of Travelers */}
					<div className="space-y-2">
						<Label
							htmlFor="travelers"
							className="text-sm font-semibold flex items-center gap-2"
						>
							<Users className="size-4 text-muted-foreground" />
							{t("trips.fields.travelers")}{" "}
							<span className="text-xs font-normal text-muted-foreground">
								({t("trips.create.optional")})
							</span>
						</Label>
						<div className="relative">
							<Users className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
							<Input
								id="travelers"
								placeholder={t("trips.placeholders.travelers")}
								type="text"
								disabled={isLoading}
								{...register("travelers")}
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
								{t("trips.create.submitting")}
							</>
						) : (
							<>
								<Sparkles className="mr-2 size-5" />
								{t("trips.create.submit_button")}
							</>
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}
