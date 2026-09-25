export type Locale = "en" | "pl";

export const defaultLocale: Locale = "en";

export const availableLocales = [
	{ code: "en" as const, label: "ENGLISH" },
	{ code: "pl" as const, label: "POLSKI" },
];
// TODO: skills: znajomość języków programowania (krócej i zwieźlej)

// Re-export per-locale dictionaries
import en from "./en";
import pl from "./pl";

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
	switch (locale) {
		case "pl":
			return pl;
		case "en":
		default:
			return en;
	}
}
