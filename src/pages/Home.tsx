import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Map, ArrowRight } from "lucide-react";

export const Home = () => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-6 p-4">
			<div className="p-4 rounded-full bg-primary/10 animate-in fade-in zoom-in duration-500">
				<Map className="w-16 h-16 text-primary" />
			</div>

			<div className="space-y-4 max-w-2xl">
				<h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
					Your Personal Travel Companion
				</h1>

				<p className="text-xl text-muted-foreground">
					Plan your trips, collaborate with friends, and keep track of your
					expenses all in one place.
				</p>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-4 pt-8 animate-in slide-in-from-bottom-4 duration-700 fade-in fill-mode-backwards delay-200">
				<Link to="/trips">
					<Button
						size="lg"
						className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20 transition-transform hover:scale-105"
					>
						Start Planning
						<ArrowRight className="ml-2 w-5 h-5" />
					</Button>
				</Link>
				<Link to="/dashboard">
					<Button
						variant="outline"
						size="lg"
						className="rounded-full px-8 h-12 text-base hover:bg-muted/50"
					>
						Go to Dashboard
					</Button>
				</Link>
			</div>
		</div>
	);
};
