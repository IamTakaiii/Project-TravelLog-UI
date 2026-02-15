import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Expense } from "../types";
import { formatMoney } from "../utils/money-formatter";
import { getCategoryById } from "../utils/category-lookup";
import { CENTRAL_FUND_ID } from "../constants/thresholds";
import { CategoryIcon } from "./category-icon";
import { MapPin, Calendar, User, Users, Receipt, Pencil, Trash2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ExpenseDetailSheetProps {
	expense: Expense | null;
	onClose: () => void;
	onEdit?: (expense: Expense) => void;
	onDelete?: (expense: Expense) => void;
}

export function ExpenseDetailSheet({
	expense,
	onClose,
	onEdit,
	onDelete,
}: ExpenseDetailSheetProps) {
	if (!expense) return null;

	const category =
		getCategoryById(expense.category) ||
		getCategoryById("other");
	const isCentral = expense.payerId === CENTRAL_FUND_ID;
	const dateObj = new Date(expense.date);

	if (!category) return null;

	return (
		<Sheet open={!!expense} onOpenChange={onClose}>
			<SheetContent className="w-full sm:max-w-md p-0 overflow-y-auto border-l border-border/50">
				{/* Hero Section */}
				<div
					className={cn(
						"relative p-6 sm:p-8 pb-10 sm:pb-12 flex flex-col items-center justify-center text-center",
						category.color.replace("text-", "bg-").replace("0", "00/20")
					)}
				>
					<div className="absolute top-4 left-4 flex gap-2">
						{onEdit && (
							<Button
								variant="primary"
								size="icon"
								onClick={() => onEdit(expense)}
								className="rounded-full shadow-lg hover:scale-110 transition-transform"
							>
								<Pencil className="size-4 text-primary-foreground" />
							</Button>
						)}
						{onDelete && (
							<Button
								variant="destructive"
								size="icon"
								onClick={() => onDelete(expense)}
								className="rounded-full shadow-lg hover:scale-110 transition-transform"
							>
								<Trash2 className="size-4 text-primary-foreground" />
							</Button>
						)}
					</div>
					<div
						className={cn(
							"size-16 sm:size-20 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-sm ring-8 ring-background",
							category.color
						)}
					>
						<CategoryIcon
							iconName={category.icon}
							className="size-8 sm:size-10"
						/>
					</div>
					<h2 className="text-xl sm:text-2xl font-[800] tracking-tight leading-tight px-4 break-words max-w-full">
						{expense.description}
					</h2>
					<div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-2 mt-2">
						<span className="text-3xl sm:text-4xl font-black font-mono tracking-tighter">
							{formatMoney(expense.thbAmount, "THB")}
						</span>
						{expense.currency !== "THB" && (
							<span className="text-xs sm:text-sm font-bold opacity-60">
								({expense.currency} {expense.amount.toLocaleString()})
							</span>
						)}
					</div>
				</div>

				{/* Details List */}
				<div className="px-4 sm:px-6 -mt-6 relative z-10 space-y-4 sm:space-y-6 pb-8 sm:pb-10">
					<div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-border/50 space-y-4 sm:space-y-6">
						{/* Meta Data */}
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 sm:pb-6 border-b border-border/50">
							<div className="flex items-center gap-3">
								<div className="p-2.5 bg-muted rounded-xl">
									<Calendar className="size-4 sm:size-5 text-muted-foreground" />
								</div>
								<div className="space-y-0.5">
									<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
										Date
									</p>
									<p className="text-xs sm:text-sm font-bold">
										{dateObj.toLocaleDateString([], { dateStyle: "medium" })}
									</p>
								</div>
							</div>
							<div className="text-left sm:text-right space-y-0.5 pl-11 sm:pl-0">
								<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
									Time
								</p>
								<p className="text-xs sm:text-sm font-bold">
									{dateObj.toLocaleTimeString([], { timeStyle: "short" })}
								</p>
							</div>
						</div>

						{/* Payer */}
						<div className="flex items-center justify-between flex-wrap gap-2">
							<div className="flex items-center gap-3">
								<div
									className={cn(
										"p-2.5 rounded-xl",
										isCentral ? "bg-amber-100" : "bg-blue-100"
									)}
								>
									<User
										className={cn(
											"size-4 sm:size-5",
											isCentral ? "text-amber-600" : "text-blue-600"
										)}
									/>
								</div>
								<div className="space-y-0.5">
									<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
										Paid By
									</p>
									<p className="text-xs sm:text-sm font-bold truncate max-w-[150px] sm:max-w-none">
										{isCentral ? "Central Fund" : `User ${expense.payerId}`}
									</p>
								</div>
							</div>
							{isCentral && (
								<span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider">
									No Debt
								</span>
							)}
						</div>

						{/* Location */}
						{expense.place?.name && (
							<div className="flex items-center gap-3">
								<div className="p-2.5 bg-rose-100 rounded-xl">
									<MapPin className="size-4 sm:size-5 text-rose-600" />
								</div>
								<div className="space-y-0.5 min-w-0 flex-1">
									<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
										Location
									</p>
									<Button
										mode="link"
										className="p-0 h-auto text-xs sm:text-sm font-bold truncate text-foreground hover:text-primary flex items-center gap-1"
										onClick={() =>
											window.open(
												`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
													expense.place!.name
												)}`,
												"_blank"
											)
										}
									>
										{expense.place.name}
										<ExternalLink className="size-3" />
									</Button>
								</div>
							</div>
						)}

						{/* Split Details */}
						<div className="pt-2">
							<div className="flex items-center gap-2 mb-3 sm:mb-4">
								<Users className="size-3.5 sm:size-4 text-primary" />
								<h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-muted-foreground">
									Split With ({expense.splitDetails.involvedUserIds.length})
								</h3>
							</div>
							<div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
								{expense.splitDetails.involvedUserIds.map((userId) => (
									<div
										key={userId}
										className="flex items-center gap-2 bg-muted/30 p-2 rounded-xl border border-border/50"
									>
										<div className="size-7 sm:size-8 rounded-full bg-background flex items-center justify-center text-[10px] sm:text-xs font-bold ring-1 ring-border shrink-0">
											{userId.slice(0, 2).toUpperCase()}
										</div>
										<div className="min-w-0 flex-1">
											<p className="text-xs font-bold text-foreground truncate">
												User {userId}
											</p>
											<p className="text-[10px] text-muted-foreground">
												{formatMoney(
													expense.thbAmount /
													expense.splitDetails.involvedUserIds.length,
													"THB"
												)}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Receipt Placeholder */}
					<div className="rounded-2xl sm:rounded-3xl border-2 border-dashed border-border p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-2 opacity-50">
						<Receipt className="size-6 sm:size-8 text-muted-foreground" />
						<p className="text-xs font-medium text-muted-foreground">
							No receipt image attached
						</p>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
