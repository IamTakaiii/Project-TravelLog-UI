import { motion } from "framer-motion";
import { Calendar, Clock, Plane, DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatDateRange, calculateDuration } from "../../utils/trip-utils";
import { useTripDetail } from "./trip-detail-context";
import { itemVariants } from "./constants";

interface StatCardProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
}

function StatCard({ icon: Icon, label, value }: StatCardProps) {
    return (
        <div className="bg-card hover:bg-primary/5 transition-all duration-200 p-5 flex flex-col items-center text-center justify-center group rounded-xl border border-border/50 shadow-sm">
            <div className="mb-3 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Icon className="size-5 text-primary" />
            </div>
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                {label}
            </span>
            <p className="font-bold text-foreground text-sm">{value}</p>
        </div>
    );
}

export function StatsGrid() {
    const { t } = useTranslation();
    const { trip } = useTripDetail();
    const duration = calculateDuration(trip.startDate, trip.endDate);

    const stats = [
        {
            icon: Calendar,
            label: t("trips.detail.travel_dates", "Travel Dates"),
            value: formatDateRange(trip.startDate, trip.endDate),
        },
        {
            icon: Clock,
            label: t("trips.detail.duration", "Duration"),
            value: `${duration} ${duration === 1 ? t("trips.detail.day", "Day") : t("trips.detail.days", "Days")}`,
        },
        {
            icon: Plane,
            label: t("trips.detail.type"),
            value:
                trip.destinationType && trip.destinationType !== "unknown"
                    ? t(`trips.destination_types.${trip.destinationType}`, {
                        defaultValue: trip.destinationType,
                    })
                    : t("trips.detail.trip"),
        },
        {
            icon: DollarSign,
            label: t("trips.detail.budget", "Budget"),
            value: trip.budget
                ? `${trip.currency || "USD"} ${Number(trip.budget).toLocaleString()}`
                : "-",
        },
    ];

    return (
        <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8"
        >
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </motion.div>
    );
}
