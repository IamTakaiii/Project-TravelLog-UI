import { formatDate } from "../../../utils/trip-utils";
import { useTripDetail } from "../trip-detail-context";

export function MetadataCard() {
    const { trip } = useTripDetail();

    return (
        <div className="pt-6 border-t border-border/50 text-xs text-muted-foreground space-y-2">
            <MetadataRow label="Created" value={formatDate(trip.createdAt)} />

            {trip.updatedAt !== trip.createdAt && (
                <>
                    <MetadataRow label="Last Updated" value={formatDate(trip.updatedAt)} />
                    {trip.updatedBy && <UpdatedByRow user={trip.updatedBy} />}
                </>
            )}
        </div>
    );
}

interface MetadataRowProps {
    label: string;
    value: string;
}

function MetadataRow({ label, value }: MetadataRowProps) {
    return (
        <p className="flex justify-between">
            <span>{label}</span>
            <span className="font-medium text-foreground">{value}</span>
        </p>
    );
}

interface UpdatedByRowProps {
    user: {
        name: string;
        image?: string | null;
    };
}

function UpdatedByRow({ user }: UpdatedByRowProps) {
    return (
        <div className="space-y-1.5">
            <p className="flex justify-between items-center">
                <span>Updated By</span>
                <span className="font-medium text-foreground flex items-center gap-1.5">
                    {user.image ? (
                        <img
                            src={user.image}
                            alt={user.name}
                            className="size-4 rounded-full object-cover"
                        />
                    ) : (
                        <span className="size-4 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">
                            {user.name?.charAt(0).toUpperCase()}
                        </span>
                    )}
                    {user.name}
                </span>
            </p>
        </div>
    );
}
