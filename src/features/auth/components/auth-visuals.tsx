import { Plane, MapPin, Camera, Compass } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AuthVisuals() {
	const { t } = useTranslation();

	return (
		<>
			{/* Background Image - Tropical Beach */}
			<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop')] bg-cover bg-center" />

			{/* Gradient Overlays */}
			<div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.35_0.12_195)] via-[oklch(0.25_0.1_195_/_0.8)] to-[oklch(0.55_0.15_35_/_0.6)]" />
			<div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.05_250)] via-transparent to-transparent" />

			{/* Floating Decorative Elements */}
			<div className="absolute top-20 right-20 animate-float opacity-60">
				<Plane className="w-12 h-12 text-white/40 rotate-[-20deg]" />
			</div>
			<div className="absolute top-40 left-16 animate-float opacity-40" style={{ animationDelay: "1s" }}>
				<Camera className="w-8 h-8 text-white/30" />
			</div>
			<div className="absolute bottom-40 right-32 animate-float opacity-50" style={{ animationDelay: "2s" }}>
				<Compass className="w-10 h-10 text-white/35" />
			</div>

			{/* Logo */}
			<div className="relative z-10 flex items-center gap-3">
				<div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
					<MapPin className="h-6 w-6 text-white" />
				</div>
				<div>
					<span className="font-heading text-2xl font-bold text-white tracking-tight">
						TravelLog
					</span>
					<p className="text-xs text-white/60 font-medium">Your Journey Awaits</p>
				</div>
			</div>

			{/* Quote Section */}
			<div className="relative z-10 max-w-lg space-y-6">
				<blockquote className="space-y-4">
					<p className="text-4xl font-heading font-semibold tracking-tight text-white leading-tight">
						"{t("auth.visuals.quote")}"
					</p>
					<footer className="flex items-center gap-3">
						<div className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent max-w-16" />
						<cite className="text-white/70 text-sm font-medium not-italic">
							{t("auth.visuals.author")}
						</cite>
					</footer>
				</blockquote>

				{/* Stats/Features */}
				<div className="flex gap-8 pt-6">
					<div className="text-center">
						<div className="text-2xl font-heading font-bold text-white">50K+</div>
						<div className="text-xs text-white/60">Travelers</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-heading font-bold text-white">120+</div>
						<div className="text-xs text-white/60">Countries</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-heading font-bold text-white">1M+</div>
						<div className="text-xs text-white/60">Memories</div>
					</div>
				</div>
			</div>
		</>
	);
}
