import { Link } from "@tanstack/react-router";
import { ArrowLeft, Share2, Edit, Trash2, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTripDetail } from "./trip-detail-context";

export function HeroNavigationBar() {
	const { t } = useTranslation();
	const { trip, setIsDeleteDialogOpen } = useTripDetail();

	return (
		<div className="absolute top-0 left-0 right-0 p-4 lg:p-6 flex justify-between items-start z-10">
			<Link to="/trips">
				<Button
					variant="ghost"
					size="sm"
					className="bg-white/90 backdrop-blur-md hover:bg-white text-gray-900 hover:text-gray-900 border border-white/50 rounded-full gap-2 pl-2 pr-4 transition-all duration-200 hover:scale-105 shadow-md"
				>
					<div className="bg-gray-100 p-1 rounded-full">
						<ArrowLeft className="size-4 text-gray-900" />
					</div>
					{t("trips.edit.back_to_trip")}
				</Button>
			</Link>

			<div className="flex gap-2">
				<Link to={`/trips/${trip.id}/money` as any}>
					<Button
						variant="primary"
						className="rounded-full transition-all duration-200 hover:scale-105 gap-2 px-4 font-semibold shadow-lg"
					>
						<Wallet className="size-4" />
						{t("trips.detail.money_management", "Money")}
					</Button>
				</Link>

				<Button
					variant="ghost"
					size="icon"
					className="bg-white/90 backdrop-blur-md hover:bg-white text-sky-600 border border-white/50 rounded-full transition-all duration-200 hover:scale-110 shadow-md"
					onClick={() => toast.info("Sharing coming soon!")}
				>
					<Share2 className="size-4" />
				</Button>

				<Link to={`/trips/${trip.id}/edit` as any}>
					<Button
						variant="ghost"
						size="icon"
						className="bg-white/90 backdrop-blur-md hover:bg-white text-amber-600 border border-white/50 rounded-full transition-all duration-200 hover:scale-110 shadow-md"
					>
						<Edit className="size-4" />
					</Button>
				</Link>

				<Button
					variant="ghost"
					size="icon"
					className="bg-white/90 backdrop-blur-md hover:bg-white text-rose-600 border border-white/50 rounded-full transition-all duration-200 hover:scale-110 shadow-md"
					onClick={() => setIsDeleteDialogOpen(true)}
				>
					<Trash2 className="size-4" />
				</Button>
			</div>
		</div>
	);
}
