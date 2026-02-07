import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { itemVariants } from "../constants";

export function MapCard() {
    return (
        <motion.div
            variants={itemVariants}
            className="bg-card rounded-3xl overflow-hidden border border-border shadow-sm"
        >
            <div className="p-4 border-b border-border/50 font-semibold flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                Location
            </div>
            <div className="aspect-square bg-muted/50 relative flex items-center justify-center group overflow-hidden cursor-pointer">
                {/* Simulated Map background */}
                <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/100.5018,13.7563,10,0/600x600@2x?access_token=YOUR_ACCESS_TOKEN')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" />

                <div className="z-10 bg-background/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg text-center transform transition-transform group-hover:scale-105">
                    <MapPin className="size-8 text-primary mx-auto mb-2" />
                    <p className="font-bold text-sm">View on Map</p>
                </div>
            </div>
        </motion.div>
    );
}
