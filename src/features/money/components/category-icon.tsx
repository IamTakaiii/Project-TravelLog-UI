import { CATEGORY_ICONS } from "../utils/money-utils";
import { Receipt } from "lucide-react";

interface CategoryIconProps {
	iconName: string;
	className?: string;
}

export function CategoryIcon({ iconName, className }: CategoryIconProps) {
	const Icon = CATEGORY_ICONS[iconName] || Receipt;
	return <Icon className={className} />;
}
