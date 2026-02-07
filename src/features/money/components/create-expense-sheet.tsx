import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Loader2, Save, MapPin } from "lucide-react";
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
import { expenseSchema, ExpenseFormValues } from "../schemas/expense-schema";
import {
	DEFAULT_CURRENCIES,
	DEFAULT_CATEGORIES,
	CENTRAL_FUND_ID,
} from "../utils/money-utils";
import { CategoryIcon } from "./category-icon";
import { SplitConfiguration } from "./split-configuration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { expensesApi } from "../api/expenses-api";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CreateExpenseSheetProps {
	tripId: string;
	currency: string;
}

export function CreateExpenseSheet({
	tripId,
	currency,
}: CreateExpenseSheetProps) {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<ExpenseFormValues>({
		resolver: zodResolver(expenseSchema),
		defaultValues: {
			description: "",
			amount: 0,
			currency: currency || "THB",
			date: new Date().toISOString().slice(0, 16),
			category: "food",
			payerId: "u1",
			splitType: "equal",
			involvedUserIds: ["u1", "u2", "u3"],
			exactAmounts: {},
			placeName: "",
		},
	});

	const createMutation = useMutation({
		mutationFn: (data: ExpenseFormValues) => expensesApi.create(tripId, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["expenses", tripId] });
			toast.success("Expense added successfully");
			setOpen(false);
			form.reset();
		},
	});

	function onSubmit(data: ExpenseFormValues) {
		createMutation.mutate(data);
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button className="h-14 w-14 rounded-3xl bg-primary shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all p-0 flex items-center justify-center border-4 border-background">
					<Plus className="size-8 text-white" strokeWidth={3} />
				</Button>
			</SheetTrigger>
			<SheetContent className="overflow-y-auto sm:max-w-md w-full border-l border-border/50">
				<SheetHeader className="space-y-1 mb-8">
					<SheetTitle className="text-2xl font-black tracking-tight">
						Record Expense
					</SheetTitle>
					<p className="text-sm text-muted-foreground font-medium">
						Keep track of where your money goes.
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
							render={({ field }) => (
								<FormItem>
									<SplitConfiguration
										totalAmount={form.watch("amount") || 0}
										currency={form.watch("currency")}
										splitType={field.value}
										onSplitTypeChange={(type) => {
											field.onChange(type);
											// Clear exact amounts when switching to equal
											if (type === "equal") {
												form.setValue("exactAmounts", {});
											}
										}}
										involvedUserIds={form.watch("involvedUserIds")}
										onInvolvedUsersChange={(userIds) =>
											form.setValue("involvedUserIds", userIds)
										}
										exactAmounts={form.watch("exactAmounts")}
										onExactAmountsChange={(amounts) =>
											form.setValue("exactAmounts", amounts)
										}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full h-14 rounded-3xl text-lg font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95"
							disabled={createMutation.isPending}
						>
							{createMutation.isPending ? (
								<Loader2 className="animate-spin mr-2" />
							) : (
								<Save className="mr-2 size-5" />
							)}
							Save Expense
						</Button>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
