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
	animation?: "default" | "none";
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
	animation = "default",
}: ConfirmDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className="max-w-[380px] w-[90vw] rounded-[2rem] p-0 border-none bg-transparent shadow-none overflow-visible">
				{/* Main Card */}
				<div className="bg-card/95 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-[2rem] shadow-2xl overflow-hidden relative">
					{/* Decorative Glows */}
					{animation === "default" && (
						<>
							<div
								className={cn(
									"absolute -top-20 -right-20 size-64 rounded-full blur-[80px] pointer-events-none opacity-60",
									variant === "destructive"
										? "bg-destructive/20"
										: "bg-primary/20"
								)}
							/>
							<div
								className={cn(
									"absolute -bottom-20 -left-20 size-64 rounded-full blur-[80px] pointer-events-none opacity-60",
									variant === "destructive"
										? "bg-destructive/10"
										: "bg-primary/10"
								)}
							/>
						</>
					)}

					<div className="flex flex-col items-center text-center p-8 space-y-6 relative z-10">
						{/* Icon Container */}
						<div className="relative">
							<div
								className={cn(
									"size-24 rounded-full flex items-center justify-center shadow-inner ring-4 ring-white/10",
									animation === "default" &&
									"animate-in zoom-in duration-500",
									variant === "destructive"
										? "bg-gradient-to-br from-destructive/10 to-destructive/20 dark:from-destructive/40 dark:to-destructive/20"
										: "bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/40 dark:to-primary/20"
								)}
							>
								{icon || (
									<AlertTriangle
										className={cn(
											"size-10 drop-shadow-sm",
											variant === "destructive"
												? "text-destructive"
												: "text-primary"
										)}
									/>
								)}
							</div>
							{/* Pulse Ring */}
							{animation === "default" && (
								<div
									className={cn(
										"absolute inset-0 rounded-full animate-ping opacity-20 duration-1000",
										variant === "destructive"
											? "bg-destructive"
											: "bg-primary"
									)}
								/>
							)}
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
										? "bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive/50 shadow-destructive/20"
										: "bg-primary hover:bg-primary/90 text-primary-foreground border-primary/50 shadow-primary/20"
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
								className="w-full h-14 rounded-xl font-bold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-muted-foreground transition-all mt-0 border-b-4 border-transparent"
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
