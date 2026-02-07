import { MapCard } from "./map-card";
import { CompanionsCard } from "./companions-card";
import { MetadataCard } from "./metadata-card";

export function TripSidebar() {
	return (
		<div className="space-y-8">
			<MapCard />
			<CompanionsCard />
			<MetadataCard />
		</div>
	);
}
