import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DetailSheetHeroProps {
    children: ReactNode;
    colorClass?: string;
    className?: string;
    actions?: ReactNode;
}

// Derive a solid accent color from the category colorClass string
// by detecting the color family (orange, blue, etc.) and mapping to bg-*-400.
function deriveAccent(colorClass?: string): string {
    if (!colorClass) return "bg-primary";
    const map: [string, string][] = [
        ["orange", "bg-orange-400"],
        ["blue", "bg-blue-400"],
        ["purple", "bg-purple-400"],
        ["pink", "bg-pink-400"],
        ["yellow", "bg-yellow-400"],
        ["emerald", "bg-emerald-400"],
        ["green", "bg-green-400"],
        ["red", "bg-red-400"],
        ["destructive", "bg-destructive"],
        ["gray", "bg-gray-400"],
    ];
    for (const [key, val] of map) {
        if (colorClass.includes(key)) return val;
    }
    return "bg-primary";
}

export function DetailSheetHero({
    children,
    colorClass,
    className,
    actions
}: DetailSheetHeroProps) {
    const accent = deriveAccent(colorClass);

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

            {/* Background decorative blurs — match category color */}
            <div className={cn(
                "absolute -top-8 -right-8 w-48 h-48 rounded-full blur-[80px] opacity-30 pointer-events-none",
                accent
            )} />
            <div className={cn(
                "absolute -bottom-8 -left-8 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none",
                accent
            )} />

            <div className="relative z-10 w-full flex flex-col items-center">
                {children}
            </div>
        </div>
    );
}
