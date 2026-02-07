import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Wallet, DollarSign, TrendingDown, TrendingUp, PieChart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useTripDetail } from "../trip-detail-context";
import { tabContentVariants } from "../constants";
import { TabHeader } from "./tab-header";

export function MoneyTab() {
    const { t } = useTranslation();
    const { trip } = useTripDetail();

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={tabContentVariants}
            transition={{ duration: 0.2 }}
            className="space-y-6"
        >
            <TabHeader
                icon={Wallet}
                title={t("trips.detail.money_summary", "Money Summary")}
                actionLabel={t("trips.detail.view_details", "View Details")}
                onAction={() => { }}
            />

            <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
                <BudgetSummaryStats trip={trip} />
                <BudgetProgressBar />
                <ExpenseCategoriesPreview tripId={trip.id} currency={trip.currency} />
            </div>
        </motion.div>
    );
}

interface BudgetSummaryStatsProps {
    trip: {
        budget: string | null;
        currency?: string;
    };
}

function BudgetSummaryStats({ trip }: BudgetSummaryStatsProps) {
    const { t } = useTranslation();
    const currency = trip.currency || "USD";
    const budget = trip.budget ? Number(trip.budget).toLocaleString() : null;

    const stats = [
        {
            icon: DollarSign,
            iconBgClass: "bg-primary/10",
            iconClass: "text-primary",
            label: t("trips.detail.total_budget", "Total Budget"),
            value: budget ? `${currency} ${budget}` : "-",
            valueClass: "text-foreground",
        },
        {
            icon: TrendingDown,
            iconBgClass: "bg-destructive/10",
            iconClass: "text-destructive",
            label: t("trips.detail.total_spent", "Total Spent"),
            value: `${currency} 0`,
            valueClass: "text-destructive",
        },
        {
            icon: TrendingUp,
            iconBgClass: "bg-emerald-500/10",
            iconClass: "text-emerald-500",
            label: t("trips.detail.remaining", "Remaining"),
            value: budget ? `${currency} ${budget}` : "-",
            valueClass: "text-emerald-500",
        },
    ];

    return (
        <div className="grid grid-cols-3 divide-x divide-border">
            {stats.map((stat, index) => (
                <div key={index} className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className={`p-2 rounded-full ${stat.iconBgClass}`}>
                            <stat.icon className={`size-4 ${stat.iconClass}`} />
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {stat.label}
                    </p>
                    <p className={`text-xl font-bold ${stat.valueClass}`}>{stat.value}</p>
                </div>
            ))}
        </div>
    );
}

function BudgetProgressBar() {
    const { t } = useTranslation();
    const percentUsed = 0; // TODO: Calculate from actual expenses

    return (
        <div className="px-6 pb-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>{t("trips.detail.budget_used", "Budget Used")}</span>
                <span>{percentUsed}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                    style={{ width: `${percentUsed}%` }}
                />
            </div>
        </div>
    );
}

interface ExpenseCategoriesPreviewProps {
    tripId: string;
    currency?: string;
}

function ExpenseCategoriesPreview({ tripId }: ExpenseCategoriesPreviewProps) {
    const { t } = useTranslation();

    return (
        <div className="border-t border-border p-6">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold flex items-center gap-2">
                    <PieChart className="size-4 text-muted-foreground" />
                    {t("trips.detail.expense_categories", "Expense Categories")}
                </p>
            </div>
            <div className="flex items-center justify-center py-8 text-muted-foreground">
                <div className="text-center space-y-2">
                    <div className="bg-muted/50 p-4 rounded-full mx-auto w-fit">
                        <Wallet className="size-6 text-muted-foreground/50" />
                    </div>
                    <p className="text-sm">
                        {t("trips.detail.no_expenses", "No expenses recorded yet")}
                    </p>
                    <Link to={`/trips/${tripId}/money` as any}>
                        <Button size="sm" className="rounded-full mt-2">
                            {t("trips.detail.add_expense", "Add Expense")}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
