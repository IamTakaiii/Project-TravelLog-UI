import { authClient } from "@/lib/auth-client";
import { DashboardHeader } from "../components/dashboard-header";
import { DashboardStats } from "../components/dashboard-stats";
import { DashboardRecentTrips } from "../components/dashboard-recent-trips";
import { DashboardQuickActions } from "../components/dashboard-quick-actions";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};

export function DashboardPage() {
    const session = authClient.useSession();
    const user = session.data?.user;

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="min-h-screen bg-background p-6 lg:p-10 space-y-10"
        >
            {/* 1. Hero Section */}
            <motion.div variants={item}>
                <DashboardHeader user={user} />
            </motion.div>

            {/* 2. Stats Section */}
            <motion.div variants={item}>
                <DashboardStats />
            </motion.div>

            {/* 3. Main Content: Split Layout */}
            <motion.section variants={item} className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Recent Trips (Wider) */}
                <DashboardRecentTrips />
                {/* Right Column: Quick Actions & Calendar (Narrower) */}
                <DashboardQuickActions />
            </motion.section>
        </motion.div>
    );
}
