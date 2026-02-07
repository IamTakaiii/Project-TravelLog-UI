import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TripCardProps {
	title: string;
	date: string;
	location: string;
	image: string;
	status: "Confirmed" | "Planning";
}

function TripCard({ title, date, location, image, status }: TripCardProps) {
	return (
		<div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer">
			<div className="aspect-[16/9] overflow-hidden">
				<img
					src={image}
					alt={title}
					className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			</div>
			<div className="p-5">
				<div className="flex justify-between items-start mb-2">
					<h3 className="font-bold text-lg group-hover:text-primary transition-colors">
						{title}
					</h3>
					<span
						className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${status === "Confirmed" ? "border-green-500 text-green-600 bg-green-50" : "border-orange-500 text-orange-600 bg-orange-50"}`}
					>
						{status}
					</span>
				</div>
				<p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
					<Calendar className="size-3" /> {date}
				</p>
				<p className="text-sm text-muted-foreground flex items-center gap-1">
					<MapIcon className="size-3" /> {location}
				</p>
			</div>
		</div>
	);
}

export function DashboardRecentTrips() {
	return (
		<div className="lg:col-span-2 space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold tracking-tight">
					Recent Itineraries
				</h2>
				<Link to="/trips">
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:text-primary p-0"
					>
						View all <ArrowUpRight className="ml-1 size-4" />
					</Button>
				</Link>
			</div>

			<div className="grid md:grid-cols-2 gap-4">
				{/* Trip Card 1 (Demo) */}
				<TripCard
					title="Summer in Italy"
					date="Jun 12 - Jun 24, 2024"
					location="Rome, Florence, Venice"
					image="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&auto=format&fit=crop&q=60"
					status="Planning"
				/>
				{/* Trip Card 2 (Demo) */}
				<TripCard
					title="Tokyo Drift"
					date="Oct 10 - Oct 20, 2024"
					location="Tokyo, Shibuya, Osaka"
					image="https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop&q=60"
					status="Confirmed"
				/>
			</div>
		</div>
	);
}
