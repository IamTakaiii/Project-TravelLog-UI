import { MapPin, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { getStatusConfig } from "../../utils/trip-utils";
import { useTripDetail } from "./trip-detail-context";

export function HeroTitleOverlay() {
    const { trip } = useTripDetail();
    const statusConfig = getStatusConfig(trip.status);

    return (
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:px-12 lg:pb-8">
            <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-3 max-w-3xl">
                        <StatusBadges
                            status={trip.status}
                            statusConfig={statusConfig}
                            destinationType={trip.destinationType}
                        />

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg leading-tight">
                            {trip.title}
                        </h1>

                        {trip.destination && (
                            <div className="flex items-center gap-2 text-white/90 text-base font-medium drop-shadow-md">
                                <MapPin className="size-4 text-emerald-400" />
                                <span>{trip.destination}</span>
                            </div>
                        )}
                    </div>

                    <CollaboratorsPreview />
                </div>
            </div>
        </div>
    );
}

interface StatusBadgesProps {
    status: string;
    statusConfig: ReturnType<typeof getStatusConfig>;
    destinationType?: string;
}

function StatusBadges({ status, statusConfig, destinationType }: StatusBadgesProps) {
    const { t } = useTranslation();

    const statusDotColor =
        status === "active"
            ? "bg-emerald-400"
            : status === "completed"
                ? "bg-blue-400"
                : "bg-gray-400";

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span
                className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-sm",
                    statusConfig.className
                        .replace("bg-", "bg-opacity-80 bg-")
                        .replace("border-", "border-opacity-50 border-")
                )}
            >
                <div className={cn("size-1.5 rounded-full animate-pulse", statusDotColor)} />
                {statusConfig.label}
            </span>

            {destinationType && destinationType !== "unknown" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    <Globe className="size-3" />
                    {t(`trips.destination_types.${destinationType}`, {
                        defaultValue: destinationType,
                    })}
                </span>
            )}
        </div>
    );
}

function CollaboratorsPreview() {
    return (
        <div className="hidden md:flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
            <div className="flex -space-x-2">
                <div
                    className="size-8 rounded-full border-2 border-white/20 bg-white/20 flex items-center justify-center text-[10px] font-bold text-white"
                    title="You"
                >
                    ME
                </div>
                <div className="size-8 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-xs text-white/70 hover:bg-white/20 transition-colors cursor-pointer">
                    +
                </div>
            </div>
            <span className="text-xs text-white/70 font-medium">Members</span>
        </div>
    );
}
