import type { ReactNode } from "react";
import { Palmtree } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { AuthVisuals } from "./auth-visuals";
import { AuthTerms } from "./auth-terms";

interface AuthLayoutProps {
    children: ReactNode;
}

/**
 * Shared layout for all auth pages (login, register, forgot-password)
 * Provides consistent styling with:
 * - Left side: Decorative visuals (hidden on mobile)
 * - Right side: Form content with background patterns
 * - Mobile logo and theme/language switchers
 */
export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="w-full min-h-screen grid lg:grid-cols-2 overflow-hidden bg-background">
            {/* Left: Decorative / Visual */}
            <div className="hidden lg:flex relative flex-col justify-between p-10 overflow-hidden">
                <AuthVisuals />
            </div>

            {/* Right: Form */}
            <div className="relative flex flex-col items-center justify-center p-8 lg:p-12 min-h-screen lg:min-h-0 overflow-y-auto bg-background">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
                </div>

                {/* Top bar with logo (mobile) and switchers */}
                <div className="absolute top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 flex items-center z-20">
                    {/* Mobile Logo */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Palmtree className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-heading text-lg font-bold text-foreground">
                            TravelLog
                        </span>
                    </div>
                    {/* Switchers - always on the right */}
                    <div className="flex items-center gap-1 ml-auto">
                        <ThemeSwitcher />
                        <LanguageSwitcher />
                    </div>
                </div>

                {/* Form content */}
                <div className="relative z-10 mx-auto w-full max-w-md space-y-8 py-16 lg:py-0">
                    {children}
                    <AuthTerms />
                </div>
            </div>
        </div>
    );
}
