import { Plus, Loader2, Save, MapPin, Zap, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEFAULT_CURRENCIES } from "../constants/currencies";
import { DEFAULT_CATEGORIES } from "../constants/categories";
import { CENTRAL_FUND_ID } from "../constants/thresholds";
import { CategoryIcon } from "./category-icon";
import { SplitConfiguration } from "./split-configuration";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CurrencyCode, Expense } from "../types";
import { useExpenseForm, FormMode } from "../hooks/use-expense-form";
import { MOCK_USERS } from "../mock/mock-users";
import { calculateEqualSplit, validateExactSplit } from "../services/split-calculator";

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
						{/* Amount Hero Input */}
						<div className="bg-muted/30 p-6 rounded-3xl border border-border/50 space-y-4">
							<div className="flex gap-3">
								<FormField
									control={form.control}
									name="currency"
									render={({ field }: { field: any }) => (
										<FormItem className="w-24">
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="h-12 bg-background border-none shadow-sm rounded-xl font-bold">
														<SelectValue />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{Object.values(DEFAULT_CURRENCIES).map((c) => (
														<SelectItem
															key={c.code}
															value={c.code}
															className="font-bold"
														>
															{c.flag} {c.code}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="amount"
									render={({ field }: { field: any }) => (
										<FormItem className="flex-1">
											<FormControl>
												<div className="relative group">
													<span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-black text-xl">
														{
															(DEFAULT_CURRENCIES as any)[
																form.watch("currency")
															]?.symbol
														}
													</span>
													<Input
														type="number"
														placeholder="0.00"
														className="h-12 pl-10 text-2xl font-black bg-background border-none shadow-sm rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20"
														{...field}
														onChange={(e) =>
															field.onChange(Number(e.target.value))
														}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Basic Info */}
						<div className="space-y-4 px-1">
							<FormField
								control={form.control}
								name="description"
								render={({ field }: { field: any }) => (
									<FormItem>
										<FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">
											What did you buy?
										</FormLabel>
										<FormControl>
											<Input
												placeholder="e.g. Sushi Dinner"
												className="h-12 rounded-2xl bg-muted/20 border-border/50 focus:bg-background transition-all font-medium"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{mode === "standard" && (
								<FormField
									control={form.control}
									name="placeName"
									render={({ field }: { field: any }) => (
										<FormItem>
											<FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
												<MapPin className="size-3" /> Where was this?
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Location (Optional)"
													className="h-12 rounded-2xl bg-muted/20 border-border/50 focus:bg-background transition-all font-medium"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
						</div>

						{/* Category Grid */}
						<div className="space-y-3 px-1">
							<FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">
								Select Category
							</FormLabel>
							<FormField
								control={form.control}
								name="category"
								render={({ field }: { field: any }) => (
									<div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
										{DEFAULT_CATEGORIES.map((cat) => (
											<div
												key={cat.id}
												onClick={() => field.onChange(cat.id)}
												className={cn(
													"cursor-pointer flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-[1.5rem] border-2 transition-all active:scale-95",
													field.value === cat.id
														? "border-primary bg-primary/5 shadow-inner"
														: "border-transparent bg-muted/30 hover:bg-muted/50"
												)}
											>
												<div
													className={cn(
														"size-8 sm:size-10 rounded-2xl flex items-center justify-center transition-transform",
														cat.color,
														field.value === cat.id ? "scale-110" : ""
													)}
												>
													<CategoryIcon
														iconName={cat.icon}
														className="size-4 sm:size-5"
													/>
												</div>
												<span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tighter truncate w-full text-center">
													{cat.name}
												</span>
											</div>
										))}
									</div>
								)}
							/>
						</div>

						{mode === "standard" && (
							<>
								{/* Payer Selection */}
								<div className="px-1">
									<FormField
										control={form.control}
										name="payerId"
										render={({ field }: { field: any }) => (
											<FormItem>
												<FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">
													Who Paid?
												</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger className="h-12 rounded-2xl bg-muted/20 border-border/50">
															<SelectValue />
														</SelectTrigger>
													</FormControl>
													<SelectContent className="rounded-2xl border-border/50 shadow-xl">
														<SelectItem value="u1" className="rounded-xl">
															👤 Me
														</SelectItem>
														<SelectItem value="u2" className="rounded-xl">
															👩 Ploy
														</SelectItem>
														<SelectItem value="u3" className="rounded-xl">
															👨 Non
														</SelectItem>
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

								{/* Split Configuration */}
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
														// Clear exact amounts when switching to equal
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
