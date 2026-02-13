import { TFunction } from "i18next";

export const getDestinationTypeOptions = (t: TFunction) => [
	{ label: t("trips.destination_types.country"), value: "country" },
	{ label: t("trips.destination_types.city"), value: "city" },
	{ label: t("trips.destination_types.province"), value: "province" },
	{ label: t("trips.destination_types.island"), value: "island" },
	{ label: t("trips.destination_types.other"), value: "other" },
];

export const currencyOptions = [
	{ label: "USD ($)", value: "USD" },
	{ label: "THB (฿)", value: "THB" },
	{ label: "EUR (€)", value: "EUR" },
	{ label: "GBP (£)", value: "GBP" },
	{ label: "JPY (¥)", value: "JPY" },
	{ label: "CNY (¥)", value: "CNY" },
];
