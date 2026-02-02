import { authClient } from "@/lib/auth-client";
import { DashboardHeader } from "./components/dashboard-header";
import { DashboardStats } from "./components/dashboard-stats";
import { DashboardRecentTrips } from "./components/dashboard-recent-trips";
import { DashboardQuickActions } from "./components/dashboard-quick-actions";

export function DashboardFeature() {
    const session = authClient.useSession();
    const user = session.data?.user;

    return (
        <div className="min-h-screen bg-background p-6 lg:p-10 space-y-10 animate-in fade-in duration-700">

            {/* 1. Hero Section */}
            <DashboardHeader user={user} />

            {/* 2. Stats Section */}
            <DashboardStats />

            {/* 3. Main Content: Split Layout */}
            <section className="grid lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-8 duration-700 delay-700">
                {/* Left Column: Recent Trips (Wider) */}
                <DashboardRecentTrips />
                {/* Right Column: Quick Actions & Calendar (Narrower) */}
                <DashboardQuickActions />
            </section>

        </div>
    );
}
