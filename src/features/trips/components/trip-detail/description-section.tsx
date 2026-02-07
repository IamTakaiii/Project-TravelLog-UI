import { motion } from "framer-motion";
import { useTripDetail } from "./trip-detail-context";
import { itemVariants } from "./constants";

export function DescriptionSection() {
    const { trip } = useTripDetail();

    return (
        <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                About this trip
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                {trip.description ? (
                    <p className="whitespace-pre-wrap">{trip.description}</p>
                ) : (
                    <div className="italic text-muted-foreground/60 p-6 bg-muted/20 rounded-xl border border-dashed border-border text-center">
                        No description provided yet.
                    </div>
                )}
            </div>
        </motion.div>
    );
}
