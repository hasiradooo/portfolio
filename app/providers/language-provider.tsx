"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	getDictionary,
	type Locale,
	defaultLocale,
	availableLocales,
} from "@/translations/i18n";

type LanguageContextValue = {
	locale: Locale;
	setLocale: (l: Locale) => void;
	dict: ReturnType<typeof getDictionary>;
	available: typeof availableLocales;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [locale, setLocale] = useState<Locale>(defaultLocale);

	// Initialize from localStorage or navigator
	useEffect(() => {
		const stored =
			typeof window !== "undefined"
				? (localStorage.getItem("lang") as Locale | null)
				: null;
		if (stored && availableLocales.some((l) => l.code === stored)) {
			setLocale(stored);
			return;
		}
		const nav = typeof window !== "undefined" ? navigator.language : undefined;
		if (nav?.toLowerCase().startsWith("pl")) setLocale("pl");
	}, []);

	// Persist selection
	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("lang", locale);
			// Update <html lang>
			document.documentElement.lang = locale;
		}
	}, [locale]);

	const dict = useMemo(() => getDictionary(locale), [locale]);

	const value: LanguageContextValue = useMemo(
		() => ({ locale, setLocale, dict, available: availableLocales }),
		[locale, dict],
	);

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const ctx = useContext(LanguageContext);
	if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
	return ctx;
}
