import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ConfirmDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: ReactNode;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	isLoading?: boolean;
	variant?: "default" | "destructive";
	icon?: ReactNode;
}

export function ConfirmDialog({
	open,
	onOpenChange,
	title,
	description,
	confirmText = "Confirm",
	cancelText = "Cancel",
	onConfirm,
	isLoading = false,
	variant = "default",
	icon,
}: ConfirmDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className="max-w-[380px] w-[90vw] rounded-[2rem] p-0 border-none bg-transparent shadow-none overflow-visible">
				{/* Main Card */}
				<div className="bg-card/95 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-[2rem] shadow-2xl overflow-hidden relative">
					{/* Decorative Glows */}
					<div
						className={cn(
							"absolute -top-20 -right-20 size-64 rounded-full blur-[80px] pointer-events-none opacity-60",
							variant === "destructive" ? "bg-red-500/20" : "bg-blue-500/20"
						)}
					/>
					<div
						className={cn(
							"absolute -bottom-20 -left-20 size-64 rounded-full blur-[80px] pointer-events-none opacity-60",
							variant === "destructive" ? "bg-orange-500/20" : "bg-purple-500/20"
						)}
					/>

					<div className="flex flex-col items-center text-center p-8 space-y-6 relative z-10">
						{/* Icon Container */}
						<div className="relative">
							<div
								className={cn(
									"size-24 rounded-full flex items-center justify-center animate-in zoom-in duration-500 shadow-inner ring-4 ring-white/10",
									variant === "destructive"
										? "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/40 dark:to-red-800/20"
										: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/20"
								)}
							>
								{icon || (
									<AlertTriangle
										className={cn(
											"size-10 drop-shadow-sm",
											variant === "destructive"
												? "text-red-500 dark:text-red-400"
												: "text-blue-500 dark:text-blue-400"
										)}
									/>
								)}
							</div>
							{/* Pulse Ring */}
							<div
								className={cn(
									"absolute inset-0 rounded-full animate-ping opacity-20 duration-1000",
									variant === "destructive" ? "bg-red-500" : "bg-blue-500"
								)}
							/>
						</div>

						<div className="space-y-3 px-2">
							<AlertDialogHeader className="space-y-3">
								<AlertDialogTitle className="text-2xl font-[800] tracking-tight text-foreground">
									{title}
								</AlertDialogTitle>
								<AlertDialogDescription className="text-base font-medium leading-relaxed text-muted-foreground/80">
									{description}
								</AlertDialogDescription>
							</AlertDialogHeader>
						</div>

						<AlertDialogFooter className="w-full flex !flex-col gap-3 sm:gap-3 !space-x-0 pt-2">
							<AlertDialogAction
								className={cn(
									"w-full h-14 rounded-xl font-bold text-lg transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] border-b-4",
									variant === "destructive"
										? "bg-red-500 hover:bg-red-600 text-white border-red-700 shadow-red-500/20"
										: "bg-blue-600 hover:bg-blue-700 text-white border-blue-800 shadow-blue-500/20"
								)}
								onClick={(e) => {
									e.preventDefault();
									onConfirm();
								}}
								disabled={isLoading}
							>
								{isLoading ? (
									<Loader2 className="animate-spin mr-2 size-5" />
								) : null}
								{confirmText}
							</AlertDialogAction>
							<AlertDialogCancel
								disabled={isLoading}
								className="w-full h-14 rounded-xl font-bold bg-muted/50 hover:bg-muted text-muted-foreground transition-all mt-0 border-b-4 border-transparent hover:border-muted-foreground/10"
							>
								{cancelText}
							</AlertDialogCancel>
						</AlertDialogFooter>
					</div>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
