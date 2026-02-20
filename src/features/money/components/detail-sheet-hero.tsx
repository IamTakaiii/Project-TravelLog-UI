import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DetailSheetHeroProps {
    children: ReactNode;
    colorClass?: string;
    className?: string;
    actions?: ReactNode;
}

export function DetailSheetHero({ 
    children, 
    colorClass, 
    className,
    actions 
}: DetailSheetHeroProps) {
    return (
        <div
            className={cn(
                "relative p-8 sm:p-12 flex flex-col items-center justify-center text-center overflow-hidden",
                colorClass,
                className
            )}
        >
            {/* Actions (Top Left) */}
            {actions && (
                <div className="absolute top-4 left-4 flex gap-2 z-20">
                    {actions}
                </div>
            )}
            
            {/* Background decorative blurs */}
            <div
                className={cn(
                    "absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none",
                    colorClass?.includes("destructive") ? "bg-destructive" : 
                    colorClass?.includes("emerald") ? "bg-emerald-500" : "bg-primary"
                )}
            />
            
            <div className="relative z-10 w-full flex flex-col items-center">
                {children}
            </div>
        </div>
    );
}
