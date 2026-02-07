import { Link } from "@tanstack/react-router";
import { Plane, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function TripListEmptyState() {
	const { t } = useTranslation();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="flex flex-col items-center justify-center py-20 px-4 text-center"
		>
			<div className="relative mb-6">
				<div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
				<div className="relative w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
					<Plane className="size-10 text-primary" />
				</div>
			</div>
			<h3 className="text-2xl font-bold mb-2">{t("trips.list.empty_title")}</h3>
			<p className="text-muted-foreground mb-6 max-w-md">
				{t("trips.list.empty_description")}
			</p>
			<Link to="/trips/create">
				<Button
					size="lg"
					className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
				>
					<Plus className="mr-2 size-5" />
					{t("trips.list.create_first_trip")}
				</Button>
			</Link>
		</motion.div>
	);
}
