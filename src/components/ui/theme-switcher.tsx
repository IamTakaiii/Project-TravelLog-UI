import { Check, Palette } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { themePresets, useThemeStore } from "@/store/use-theme-store";

export function ThemeSwitcher() {
    const { preset, setPreset } = useThemeStore();

    // Initialize theme on mount
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", preset);
    }, [preset]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full hover:bg-primary/10 active:bg-primary/20 data-[state=open]:bg-primary/20 relative group"
                    aria-label="Switch theme preset"
                >
                    <Palette className="h-5 w-5 text-foreground transition-transform group-hover:scale-110" />
                    <span className="sr-only">Switch theme</span>
                    {/* Active indicator dot */}
                    <span
                        className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-background shadow-md"
                        style={{
                            backgroundColor: themePresets.find(p => p.id === preset)?.primaryColor,
                        }}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-heading">
                    Theme Presets
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {themePresets.map((theme) => (
                    <DropdownMenuItem
                        key={theme.id}
                        onClick={() => setPreset(theme.id)}
                        className="flex items-center gap-3 cursor-pointer py-2.5 hover:bg-primary/10 focus:bg-primary/10"
                    >
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg shrink-0 border"
                            style={{
                                backgroundColor: `oklch(from ${theme.primaryColor} l c h / 0.15)`,
                                borderColor: `oklch(from ${theme.primaryColor} l c h / 0.3)`,
                            }}
                        >
                            {theme.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{theme.name}</div>
                            <div className="text-xs text-muted-foreground truncate">
                                {theme.description}
                            </div>
                        </div>
                        {preset === theme.id && (
                            <Check className="h-4 w-4 text-primary shrink-0" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
