import { useState } from "react";
import { Plus, Wallet, Trash2, Edit2, X, Save, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";

import { ConfirmDialog } from "@/components/common/confirm-dialog";

import {
	fundsQueryOptions,
	fundsQueryKeys,
	useFundMutations,
} from "@/features/money/queries/fund-queries";
import { fundsApi } from "@/features/money/api/funds-api";
import {
	centralFundSchema,
	CentralFundFormValues,
} from "@/features/money/schemas/central-fund-schema";
import { DEFAULT_CURRENCIES } from "@/features/money/constants/currencies";
import { getCurrencySymbol } from "@/features/money/utils/money-formatter";
import { Fund, CurrencyCode } from "@/features/money/types";

interface CentralFundSheetProps {
	tripId: string;
	currency: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CentralFundSheet({
	tripId,
	currency: defaultCurrency,
	open,
	onOpenChange,
}: CentralFundSheetProps) {
	const { data: funds = [] } = useQuery(fundsQueryOptions(tripId));
	const { data: summary } = useQuery({
		queryKey: fundsQueryKeys.summary(tripId),
		queryFn: () => fundsApi.getSummary(tripId),
		enabled: !!tripId,
	});
	const { createMutation, updateMutation, deleteMutation } =
		useFundMutations(tripId);

	const [editingFund, setEditingFund] = useState<Fund | null>(null);
	const [isAdding, setIsAdding] = useState(false);
	const [deletingFund, setDeletingFund] = useState<Fund | null>(null);

	const form = useForm<CentralFundFormValues>({
		resolver: zodResolver(centralFundSchema),
		defaultValues: {
			title: "",
			amount: 0,
			currency: defaultCurrency || "THB",
		},
	});

	const handleSubmit = (data: CentralFundFormValues) => {
		if (editingFund) {
			updateMutation.mutate(
				{
					id: editingFund.id,
					data: {
						title: data.title,
						amount: data.amount,
						currency: data.currency as any,
						tripId,
					},
				},
				{
					onSuccess: () => {
						resetForm();
					},
				}
			);
		} else {
			createMutation.mutate(
				{
					title: data.title,
					amount: data.amount,
					currency: data.currency as any,
					tripId,
				},
				{
					onSuccess: () => {
						resetForm();
					},
				}
			);
		}
	};

	const resetForm = () => {
		setEditingFund(null);
		setIsAdding(false);
		form.reset({
			title: "",
			amount: 0,
			currency: defaultCurrency || "THB",
		});
	};

	const startEdit = (fund: Fund) => {
		setEditingFund(fund);
		setIsAdding(true);
		form.reset({
			title: fund.title,
			amount: fund.amount,
			currency: fund.currency,
		});
	};

	const startAdd = () => {
		setEditingFund(null);
		setIsAdding(true);
		form.reset({
			title: "",
			amount: 0,
			currency: defaultCurrency || "THB",
		});
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="w-full sm:max-w-md overflow-y-auto">
				<SheetHeader className="mb-6">
					<SheetTitle className="flex items-center gap-2 text-xl font-bold">
						<div className="p-2 bg-primary/10 rounded-xl">
							<Wallet className="size-5 text-primary" />
						</div>
						Central Fund Management
					</SheetTitle>
				</SheetHeader>

				{isAdding ? (
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
								{editingFund ? "Edit Fund" : "Add New Fund"}
							</h3>
							<Button
								variant="ghost"
								size="sm"
								onClick={resetForm}
								className="h-8 w-8 p-0 rounded-full"
							>
								<X className="size-4" />
							</Button>
						</div>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(handleSubmit)}
								className="space-y-6"
							>
								<div className="bg-muted/30 p-6 rounded-3xl border border-border/50 space-y-4">
									<FormField
										control={form.control}
										name="title"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder="Fund Title (e.g. Initial Budget)"
														className="h-12 text-lg font-bold bg-background border-none shadow-sm rounded-xl"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="flex gap-3">
										<div className="h-12 w-24 bg-background shadow-sm rounded-xl font-bold flex items-center justify-center gap-1.5 text-sm text-muted-foreground select-none">
											{
												DEFAULT_CURRENCIES[defaultCurrency as CurrencyCode]
													?.flag
											}{" "}
											{defaultCurrency}
										</div>
										<FormField
											control={form.control}
											name="amount"
											render={({ field }) => (
												<FormItem className="flex-1">
													<FormControl>
														<div className="relative group">
															<span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-black text-xl">
																{getCurrencySymbol(
																	defaultCurrency as CurrencyCode
																)}
															</span>
															<Input
																type="number"
																placeholder="0.00"
																className="h-12 pl-10 text-2xl font-black bg-background border-none shadow-sm rounded-xl"
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

								<Button
									type="submit"
									className="w-full h-12 rounded-2xl font-bold"
									disabled={
										createMutation.isPending || updateMutation.isPending
									}
								>
									{createMutation.isPending || updateMutation.isPending ? (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									) : (
										<Save className="mr-2 h-4 w-4" />
									)}
									Save Fund
								</Button>
							</form>
						</Form>
					</div>
				) : (
					<div className="space-y-6">
						<div className="space-y-3">
							{funds.length === 0 ? (
								<div className="text-center py-10 text-muted-foreground">
									<Wallet className="size-10 mx-auto mb-3 opacity-20" />
									<p className="text-sm">No funds added yet</p>
								</div>
							) : (
								funds.map((fund) => {
									const details = summary?.fundDetails?.find(
										(f) => f.id === fund.id
									);
									const remaining = details?.remaining ?? fund.amount;
									const isDepleted = remaining <= 0;

									return (
										<div
											key={fund.id}
											className={`group relative bg-card hover:bg-muted/30 border border-border/40 hover:border-border/80 rounded-[1.25rem] p-4 transition-all duration-300 ${isDepleted ? "opacity-70" : ""}`}
										>
											<div className="flex items-start justify-between gap-4">
												<div className="flex items-start gap-4 min-w-0">
													<div className="size-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border border-primary/10 dark:border-primary/20 flex items-center justify-center shrink-0 shadow-sm">
														<span className="text-xl filter drop-shadow-sm">
															{
																DEFAULT_CURRENCIES[
																	fund.currency as CurrencyCode
																]?.flag
															}
														</span>
													</div>
													<div className="space-y-1 min-w-0">
														<h4 className="font-extrabold text-base leading-tight truncate pr-2 text-foreground/90">
															{fund.title}
														</h4>
														<div className="flex items-baseline gap-1.5 flex-wrap">
															<span className="text-xs font-bold text-muted-foreground/70 uppercase tracking-wider bg-muted/50 px-1.5 py-0.5 rounded-md">
																Remaining
															</span>
															<span
																className={`font-bold font-mono text-sm ${isDepleted ? "text-destructive" : "text-primary"}`}
															>
																{getCurrencySymbol(
																	fund.currency as CurrencyCode
																)}
																{remaining.toLocaleString(undefined, {
																	minimumFractionDigits: 2,
																	maximumFractionDigits: 2,
																})}
															</span>
															<span className="text-xs font-medium text-muted-foreground/60 ml-1">
																/{" "}
																{fund.amount.toLocaleString(undefined, {
																	maximumFractionDigits: 0,
																})}
															</span>
														</div>
													</div>
												</div>

												<div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform sm:translate-x-4 sm:group-hover:translate-x-0">
													<Button
														variant="ghost"
														size="icon"
														className="size-8 rounded-xl hover:!bg-primary/10 hover:!text-primary transition-colors"
														onClick={() => startEdit(fund)}
													>
														<Edit2 className="size-3.5" />
													</Button>
													<Button
														variant="ghost"
														size="icon"
														className="size-8 rounded-xl hover:!bg-destructive/10 hover:!text-destructive transition-colors"
														onClick={() => setDeletingFund(fund)}
													>
														<Trash2 className="size-3.5" />
													</Button>
												</div>
											</div>
										</div>
									);
								})
							)}
						</div>

						<Button
							onClick={startAdd}
							className="w-full h-12 rounded-2xl font-bold shadow-lg shadow-primary/20"
						>
							<Plus className="mr-2 size-5" /> Add Fund
						</Button>
					</div>
				)}

				<ConfirmDialog
					open={!!deletingFund}
					onOpenChange={(open) => !open && setDeletingFund(null)}
					title="Delete Fund"
					description="Are you sure you want to delete this fund? This action cannot be undone."
					confirmText="Delete"
					variant="destructive"
					onConfirm={() => {
						if (deletingFund) {
							deleteMutation.mutate(deletingFund.id);
							setDeletingFund(null);
						}
					}}
				/>
			</SheetContent>
		</Sheet>
	);
}
