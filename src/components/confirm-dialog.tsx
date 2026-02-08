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
			<AlertDialogContent className="max-w-[400px] rounded-[2.5rem] p-8 border-border/40 bg-card/70 backdrop-blur-2xl shadow-2xl overflow-hidden">
				{/* Decorative background glow */}
				<div
					className={cn(
						"absolute -top-24 -right-24 size-48 blur-[60px] pointer-events-none",
						variant === "destructive" ? "bg-destructive/10" : "bg-primary/10"
					)}
				/>

				<div className="flex flex-col items-center text-center space-y-6 relative z-10">
					<div
						className={cn(
							"size-20 rounded-full flex items-center justify-center animate-in zoom-in duration-500",
							variant === "destructive" ? "bg-destructive/10" : "bg-primary/10"
						)}
					>
						<div
							className={cn(
								"size-14 rounded-full flex items-center justify-center",
								variant === "destructive" ? "bg-destructive/20" : "bg-primary/20"
							)}
						>
							{icon || (
								<AlertTriangle
									className={cn(
										"size-7",
										variant === "destructive"
											? "text-destructive"
											: "text-primary"
									)}
								/>
							)}
						</div>
					</div>

					<div className="space-y-2">
						<AlertDialogHeader className="space-y-2">
							<AlertDialogTitle className="text-2xl font-[900] tracking-tight text-foreground text-center">
								{title}
							</AlertDialogTitle>
							<AlertDialogDescription className="text-sm font-medium leading-relaxed text-muted-foreground px-2 block">
								{description}
							</AlertDialogDescription>
						</AlertDialogHeader>
					</div>

					<AlertDialogFooter className="w-full flex flex-col gap-3 sm:flex-col sm:space-x-0">
						<AlertDialogAction
							className={cn(
								"w-full h-14 rounded-2xl font-black text-lg transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]",
								variant === "destructive"
									? "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-destructive/20"
									: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20"
							)}
							onClick={(e) => {
								e.preventDefault();
								onConfirm();
							}}
							disabled={isLoading}
						>
							{isLoading ? (
								<Loader2 className="animate-spin mr-2" />
							) : (
								confirmText
							)}
						</AlertDialogAction>
						<AlertDialogCancel
							disabled={isLoading}
							className="w-full h-14 rounded-2xl font-bold border-none bg-muted/50 hover:bg-muted text-muted-foreground transition-all mt-0"
						>
							{cancelText}
						</AlertDialogCancel>
					</AlertDialogFooter>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
