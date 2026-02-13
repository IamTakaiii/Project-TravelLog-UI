import { Plus, Loader2, Save, Zap, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SplitConfiguration } from "./split-configuration";
import { useState } from "react";
import { CurrencyCode, Expense } from "../types";
import { useExpenseForm, FormMode } from "../hooks/use-expense-form";
import { MOCK_USERS } from "../mock/mock-users";
import { calculateEqualSplit, validateExactSplit } from "../services/split-calculator";

// Sub-components
import { AmountHeroInput } from "./expense-form/amount-hero-input";
import { CategoryGrid } from "./expense-form/category-grid";
import { BasicInfoFields } from "./expense-form/basic-info-fields";
import { PayerSelect } from "./expense-form/payer-select";

interface ExpenseFormSheetProps {
	tripId: string;
	currency: string;
	expense?: Expense;
	trigger?: React.ReactNode;
	onOpenChange?: (open: boolean) => void;
	open?: boolean;
}

export function ExpenseFormSheet({
	tripId,
	currency,
	expense,
	trigger,
	onOpenChange,
	open: controlledOpen,
}: ExpenseFormSheetProps) {
	const [internalOpen, setInternalOpen] = useState(false);
	const open = controlledOpen ?? internalOpen;
	const setOpen = onOpenChange ?? setInternalOpen;

	const { form, mode, setMode, isEditing, isPending, onSubmit } =
		useExpenseForm({
			tripId,
			currency,
			expense,
			onSuccess: () => setOpen(false),
		});

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			{trigger ? (
				<SheetTrigger asChild>{trigger}</SheetTrigger>
			) : !isEditing ? (
				<SheetTrigger asChild>
					<Button
						variant="primary"
						className="h-14 w-14 rounded-3xl bg-primary shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all p-0 flex items-center justify-center border-4 border-background"
					>
						<Plus className="size-8 text-primary-foreground" strokeWidth={3} />
					</Button>
				</SheetTrigger>
			) : null}
			<SheetContent className="overflow-y-auto sm:max-w-md w-full border-l border-border/50">
				<SheetHeader className="space-y-1 mb-6">
					<div className="flex items-center justify-between">
						<SheetTitle className="text-2xl font-black tracking-tight">
							{isEditing ? "Edit Expense" : "Record Expense"}
						</SheetTitle>
						<Tabs
							value={mode}
							onValueChange={(v) => setMode(v as FormMode)}
							className="w-fit"
						>
							<TabsList className="grid grid-cols-2 h-9 rounded-full p-1 bg-muted/50">
								<TabsTrigger
									value="quick"
									className="rounded-full px-4 text-[10px] font-black uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
								>
									<Zap className="size-3 mr-1.5" /> Quick
								</TabsTrigger>
								<TabsTrigger
									value="standard"
									className="rounded-full px-4 text-[10px] font-black uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
								>
									<Settings2 className="size-3 mr-1.5" /> Full
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>
					<p className="text-sm text-muted-foreground font-medium">
						{mode === "quick"
							? "Fastest way to track your spending."
							: "Detailed breakdown for accurate records."}
					</p>
				</SheetHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<AmountHeroInput control={form.control} />

						<BasicInfoFields control={form.control} mode={mode} />

						<CategoryGrid control={form.control} />

						{mode === "standard" && (
							<>
								<PayerSelect control={form.control} />

								<FormField
									control={form.control}
									name="splitType"
									render={({ field }) => {
										const amount = form.watch("amount") || 0;
										const watchedCurrency = form.watch("currency") as CurrencyCode;
										const involvedUserIds = form.watch("involvedUserIds");
										const watchedExactAmounts = form.watch("exactAmounts") ?? {};

										const equalSplit = calculateEqualSplit(amount, involvedUserIds);
										const exactValidation = validateExactSplit(amount, watchedExactAmounts);

										return (
											<FormItem>
												<SplitConfiguration
													totalAmount={amount}
													currency={watchedCurrency}
													splitType={field.value}
													onSplitTypeChange={(type) => {
														field.onChange(type);
														if (type === "equal") {
															form.setValue("exactAmounts", {});
														}
													}}
													involvedUserIds={involvedUserIds}
													onInvolvedUsersChange={(userIds) =>
														form.setValue("involvedUserIds", userIds)
													}
													exactAmounts={watchedExactAmounts}
													onExactAmountChange={(userId, value) => {
														const newAmounts = {
															...watchedExactAmounts,
															[userId]: value,
														};
														form.setValue("exactAmounts", newAmounts);
													}}
													users={MOCK_USERS}
													equalSplitAmount={equalSplit.perPersonAmount}
													exactTotal={exactValidation.totalAssigned}
													isExactValid={exactValidation.isValid}
												/>
												<FormMessage />
											</FormItem>
										);
									}}
								/>
							</>
						)}

						<Button
							variant="primary"
							type="submit"
							className="w-full h-14 rounded-3xl text-lg font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95"
							disabled={isPending}
						>
							{isPending ? (
								<Loader2 className="animate-spin mr-2" />
							) : (
								<Save className="mr-2 size-5 text-primary-foreground" />
							)}
							<span className="text-primary-foreground">
								{isEditing ? "Update Expense" : "Save Expense"}
							</span>
						</Button>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}

