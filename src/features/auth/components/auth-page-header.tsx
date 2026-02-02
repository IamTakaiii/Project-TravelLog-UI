import type { LucideIcon } from "lucide-react";

interface AuthPageHeaderProps {
    badge?: {
        icon?: LucideIcon;
        text: string;
        variant?: "primary" | "accent" | "muted";
        animated?: boolean;
    };
    title: string;
    description: string;
}


export function AuthPageHeader({ badge, title, description }: AuthPageHeaderProps) {
    const getBadgeClasses = () => {
        switch (badge?.variant) {
            case "accent":
                return "bg-accent/10 text-accent";
            case "muted":
                return "bg-muted text-muted-foreground";
            case "primary":
            default:
                return "bg-primary/10 text-primary";
        }
    };

    return (
        <div className="space-y-3 text-center lg:text-left">
            {badge && (
                <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-2 ${getBadgeClasses()}`}
                >
                    {badge.animated && (
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
                        </span>
                    )}
                    {badge.icon && !badge.animated && (
                        <badge.icon className="h-3.5 w-3.5" />
                    )}
                    {badge.text}
                </div>
            )}
            <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-foreground">
                {title}
            </h1>
            <p className="text-muted-foreground text-base">{description}</p>
        </div>
    );
}
