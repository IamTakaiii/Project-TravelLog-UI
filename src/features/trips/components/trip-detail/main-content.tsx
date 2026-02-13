import { motion } from "framer-motion";
import { DescriptionSection } from "./description-section";
import { TabNavigation } from "./tab-navigation";
import { TabContent } from "./tabs/tab-content";
import { fadeInUp } from "@/lib/animations";

export function MainContent() {
	return (
		<div className="lg:col-span-2 space-y-12">
			<DescriptionSection />

			<motion.div variants={fadeInUp} className="space-y-6">
				<TabNavigation />
				<TabContent />
			</motion.div>
		</div>
	);
}
