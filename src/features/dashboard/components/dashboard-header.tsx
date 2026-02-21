import { Link } from "@tanstack/react-router";
import { Map as MapIcon, Plane, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "better-auth";
import { motion, type Variants } from "framer-motion";

interface DashboardHeaderProps {
	user: User | undefined;
}

const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring" as const,
			stiffness: 100,
			damping: 20,
		},
	},
};

const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

export function DashboardHeader({ user }: DashboardHeaderProps) {
	return (
		<section className="relative rounded-3xl overflow-hidden bg-primary/5 dark:bg-primary/10 border border-primary/10 shadow-2xl shadow-primary/5">
			{/* Decorative Background Blobs */}
			<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

			<motion.div
				className="relative z-10 p-8 md:p-12 lg:flex justify-between items-center gap-10"
				variants={staggerContainer}
				initial="hidden"
				animate="show"
			>
				<div className="space-y-4 max-w-2xl">
					<motion.div
						variants={fadeInUp}
						className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 backdrop-blur-sm border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider"
					>
						<Plane className="size-3" /> Travel Log Dashboard
					</motion.div>

					<motion.h1
						variants={fadeInUp}
						className="text-4xl md:text-5xl lg:text-6xl font-[800] tracking-tight text-foreground leading-[1.1]"
					>
						Hello,{" "}
						<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
							{user?.name || "Traveler"}
						</span>
						! 🌍
					</motion.h1>

					<motion.p
						variants={fadeInUp}
						className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed"
					>
						Your journey isn't just a trip; it's a story waiting to be written.
						Where shall we go next?
					</motion.p>

					<motion.div variants={fadeInUp} className="pt-4 flex flex-wrap gap-4">
						<Link to="/trips/create">
							<Button
								size="lg"
								className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all"
							>
								<Plus className="mr-2 size-5" /> Plan a New Trip
							</Button>
						</Link>
						<Button
							size="lg"
							variant="secondary"
							className="rounded-full px-8 bg-white dark:bg-zinc-800 border-border shadow-sm hover:shadow-md transition-all"
						>
							<Search className="mr-2 size-4" /> Explore Destinations
						</Button>
					</motion.div>
				</div>

				{/* Hero Image / Illustration Placeholder */}
				<motion.div variants={fadeInUp} className="hidden lg:block relative">
					<div className="relative z-10 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl w-[320px] rotate-3 hover:rotate-0 transition-transform duration-500">
						<div className="flex items-center gap-3 mb-4">
							<div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
								<MapIcon size={20} />
							</div>
							<div>
								<h3 className="font-bold text-sm">Upcoming Adventure</h3>
								<p className="text-xs text-muted-foreground">Kyoto, Japan</p>
							</div>
							<span className="ml-auto text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
								5d left
							</span>
						</div>
						<div className="h-32 rounded-lg bg-muted/50 w-full mb-4 overflow-hidden relative group">
							<img
								src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
								className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
								alt="Japan"
							/>
						</div>
						<div className="flex justify-between items-center text-sm">
							<div className="flex -space-x-2">
								<div className="size-6 rounded-full bg-gray-200 border-2 border-background"></div>
								<div className="size-6 rounded-full bg-gray-300 border-2 border-background"></div>
								<div className="size-6 rounded-full bg-gray-400 border-2 border-background flex items-center justify-center text-[8px]">
									+2
								</div>
							</div>
							<span className="text-muted-foreground">4 Travelers</span>
						</div>
					</div>

					{/* Decorative Elements behind card */}
					<div className="absolute top-10 -right-4 w-20 h-20 bg-accent rounded-full opacity-20 blur-xl animate-pulse" />
				</motion.div>
			</motion.div>
		</section>
	);
}
