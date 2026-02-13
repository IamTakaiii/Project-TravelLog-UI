import { Link } from "@tanstack/react-router";
import { ArrowLeft, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/page-header";

interface MoneyHeaderProps {
	tripId: string;
	tripTitle: string;
}

export function MoneyHeader({ tripId, tripTitle }: MoneyHeaderProps) {
	return (
		<PageHeader
			backButton={
				<Link to={`/trips/${tripId}` as any}>
					<Button
						variant="ghost"
						size="sm"
						className="mb-4 -ml-2 gap-2 text-muted-foreground hover:text-foreground"
					>
						<ArrowLeft className="size-4" />
						Back to Trip
					</Button>
				</Link>
			}
			badge={{
				icon: Wallet,
				text: "Money Management",
			}}
			title="Budget & Expenses"
			description={
				<>
					Track spending, split expenses, and manage your budget for{" "}
					<span className="font-semibold text-foreground">{tripTitle}</span>
				</>
			}
		/>
	);
}

