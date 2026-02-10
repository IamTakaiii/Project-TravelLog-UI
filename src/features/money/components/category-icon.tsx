import { CATEGORY_ICONS } from "../constants/categories";
import { Receipt } from "lucide-react";

interface CategoryIconProps {
	iconName: string;
	className?: string;
}

export function CategoryIcon({ iconName, className }: CategoryIconProps) {
	const Icon = CATEGORY_ICONS[iconName] || Receipt;
	return <Icon className={className} />;
}
