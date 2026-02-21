import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetHeader,
	SheetDescription,
} from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { historyQueryOptions } from "../queries/money-queries";
import { Loader2, FileText, Trash2, Edit, Plus, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import dayjs from "dayjs";
import { ExpenseLog } from "../types";

interface HistorySheetProps {
	tripId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function HistorySheet({
	tripId,
	open,
	onOpenChange,
}: HistorySheetProps) {
	const { data: logs, isLoading } = useQuery(historyQueryOptions(tripId));

	const getActionIcon = (action: string) => {
		switch (action) {
			case "CREATE":
				return <Plus className="size-4 text-green-500" />;
			case "UPDATE":
				return <Edit className="size-4 text-blue-500" />;
			case "DELETE":
				return <Trash2 className="size-4 text-red-500" />;
			default:
				return <FileText className="size-4 text-gray-500" />;
		}
	};

	const getActionColor = (action: string) => {
		switch (action) {
			case "CREATE":
				return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
			case "UPDATE":
				return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
			case "DELETE":
				return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full border-l border-border/50">
				<SheetHeader className="p-6 border-b">
					<SheetTitle>Activity Log</SheetTitle>
					<SheetDescription>
						History of all changes made to expenses in this trip.
					</SheetDescription>
				</SheetHeader>

				<ScrollArea className="flex-1 p-6">
					{isLoading ? (
						<div className="flex justify-center p-8">
							<Loader2 className="size-8 animate-spin text-muted-foreground" />
						</div>
					) : !logs?.length ? (
						<div className="text-center p-8 text-muted-foreground">
							No activity recorded yet.
						</div>
					) : (
						<div className="pl-2 pt-2 pb-6">
							{logs.map((log: ExpenseLog, index: number) => {
								const isLast = index === logs.length - 1;
								return (
									<div
										key={log.id}
										className={`relative pl-8 pb-8 border-l-2 ${isLast ? "border-transparent" : "border-border/50"}`}
									>
										<div
											className={`absolute -left-[13px] top-0 size-6 flex items-center justify-center rounded-full border-2 border-background ${getActionColor(log.action).split(" ")[0]}`}
										>
											{getActionIcon(log.action)}
										</div>

										<div className="flex flex-col gap-2 -mt-1">
											<div className="flex items-center justify-between">
												<span
													className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getActionColor(log.action)}`}
												>
													{log.action}
												</span>
												<span className="text-xs text-muted-foreground font-mono">
													{dayjs(log.timestamp).format("MMM D, HH:mm")}
												</span>
											</div>

											<div className="bg-muted/30 rounded-lg p-3 border border-border/50">
												<p className="font-bold text-sm text-foreground">
													{log.data.title || "Unknown Expense"}
												</p>
												<p className="text-xs text-muted-foreground mt-1">
													{Number(log.data.amount || 0).toFixed(2)}{" "}
													{log.data.currency}
												</p>
											</div>

											<div className="flex items-center gap-2 text-xs text-muted-foreground">
												<div className="size-5 rounded-full bg-muted flex items-center justify-center overflow-hidden">
													{log.user.image ? (
														<img
															src={log.user.image}
															alt={log.user.name}
															className="size-full object-cover"
														/>
													) : (
														<User className="size-3" />
													)}
												</div>
												<span>{log.user.name}</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
