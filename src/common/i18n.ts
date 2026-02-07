import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { isProduction } from "./utils";

// Import your translation files (adjust paths as needed)
import translationEN from "@/assets/locales/en/translations.json";
import translationES from "@/assets/locales/es/translations.json";
import translationTH from "@/assets/locales/th/translations.json";

// Define the resources
export const resources = {
	en: {
		translation: translationEN,
	},
	es: {
		translation: translationES,
	},
	th: {
		translation: translationTH,
	},
} as const;

// Initialize i18next
i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "en",
		debug: !isProduction,
		interpolation: {
			escapeValue: false, // React already safe from XSS
		},
		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"],
		},
	});

export default i18n;
