import {
    ArrowUpRight,
    Calendar,
    Users,
    Map as MapIcon,
    LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface QuickActionButtonProps {
    icon: LucideIcon;
    label: string;
    desc: string;
}

function QuickActionButton({ icon: Icon, label, desc }: QuickActionButtonProps) {
    return (
        <button className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left w-full group border border-transparent hover:border-border/50">
            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="size-5" />
            </div>
            <div>
                <div className="font-semibold text-sm group-hover:text-primary transition-colors">{label}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
            </div>
            <ArrowUpRight className="ml-auto size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
    )
}

export function DashboardQuickActions() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight">Quick Actions</h2>
            </div>
            <Card className="border-border/60 shadow-sm">
                <CardContent className="p-4 grid gap-2">
                    <QuickActionButton icon={Calendar} label="Trip Calendar" desc="View your schedule" />
                    <QuickActionButton icon={Users} label="Find Buddies" desc="Invite friends to join" />
                    <QuickActionButton icon={MapIcon} label="My Map" desc="Pin places you've been" />
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-transparent border-none shadow-none">
                <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Upgrade to Pro</h3>
                    <p className="text-sm text-muted-foreground mb-4">Unlock unlimited trips, offline maps, and exclusive travel deals.</p>
                    <Button className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90">Upgrade Now</Button>
                </CardContent>
            </Card>
        </div>
    );
}
