import { Link } from "@tanstack/react-router";
import { ArrowLeft, Plane, Map, Compass } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CreateTripForm } from "../components/create-trip-form";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const item: Variants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};

export function CreateTripPage() {
	const { t } = useTranslation();
	return (
		<motion.div
			variants={container}
			initial="hidden"
			animate="show"
			className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5"
		>
			{/* Decorative Background Elements */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 right-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
				<div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] animate-pulse delay-1000" />
			</div>

			<div className="relative z-10 container max-w-4xl mx-auto px-4 py-8 md:py-12">
				{/* Back Button */}
				<motion.div variants={item} className="mb-8">
					<Link to="/trips">
						<Button variant="ghost" size="sm" className="gap-2">
							<ArrowLeft className="size-4" />
							{t("trips.create.back_button")}
						</Button>
					</Link>
				</motion.div>

				{/* Header Section */}
				<motion.div variants={item} className="mb-10 space-y-4">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider">
						<Plane className="size-3" /> {t("trips.create.badge")}
					</div>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-[800] tracking-tight text-foreground leading-[1.1]">
						{t("trips.create.title")}{" "}
						<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
							{t("trips.create.subtitle")}
						</span>
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
						{t("trips.create.description")}
					</p>
				</motion.div>

				{/* Form Card */}
				<motion.div variants={item} className="relative">
					{/* Decorative Elements */}
					<div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse" />
					<div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse delay-500" />

					{/* Main Card */}
					<div className="relative bg-background/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl shadow-primary/5 p-6 md:p-8 lg:p-10">
						{/* Decorative Icons */}
						<div className="absolute top-6 right-6 opacity-5">
							<Map className="size-32 text-primary" />
						</div>
						<div className="absolute bottom-6 left-6 opacity-5">
							<Compass className="size-24 text-accent" />
						</div>

						{/* Form Content */}
						<div className="relative z-10">
							<CreateTripForm />
						</div>
					</div>
				</motion.div>

				{/* Tips Section */}
				<motion.div
					variants={item}
					className="mt-10 p-6 rounded-2xl bg-muted/30 border border-border/50"
				>
					<h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
						<Compass className="size-4 text-primary" />
						{t("trips.create.tips_title")}
					</h3>
					<ul className="space-y-2 text-sm text-muted-foreground">
						<li className="flex items-start gap-2">
							<span className="text-primary mt-0.5">•</span>
							<span>{t("trips.create.tips.tip1")}</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-primary mt-0.5">•</span>
							<span>{t("trips.create.tips.tip2")}</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-primary mt-0.5">•</span>
							<span>{t("trips.create.tips.tip3")}</span>
						</li>
					</ul>
				</motion.div>
			</div>
		</motion.div>
	);
}
