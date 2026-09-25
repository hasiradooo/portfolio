import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Locale } from "@/translations/i18n";

// Define ProjectStatus enum directly since we no longer import from data.ts
enum ProjectStatus {
	InDevelopment = "InDevelopment",
	Completed = "Completed",
	Archived = "Archived",
	Concept = "Concept",
	OnHold = "OnHold",
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Map project status to badge variant
export const getStatusVariant = (status: ProjectStatus | string) => {
	switch (status.toLowerCase()) {
		case ProjectStatus.Completed.toLowerCase():
			return "stable";
		case ProjectStatus.InDevelopment.toLowerCase():
			return "development";
		case ProjectStatus.Concept.toLowerCase():
			return "concept";
		case ProjectStatus.Archived.toLowerCase():
			return "archived";
		case ProjectStatus.OnHold.toLowerCase():
			return "beta";
		case "stable":
		case "released":
			return "stable";
		case "beta":
			return "beta";
		case "alpha":
			return "alpha";
		default:
			return "secondary";
	}
};

/**
 * Calculate age based on birth date
 * @param birthDate Birth date as Date object or string (YYYY-MM-DD)
 * @returns Current age as number
 */
export function calculateAge(birthDate: Date | string): number {
	const birth = typeof birthDate === "string" ? new Date(birthDate) : birthDate;
	const now = new Date();

	let age = now.getFullYear() - birth.getFullYear();
	const monthDiff = now.getMonth() - birth.getMonth();
	const dayDiff = now.getDate() - birth.getDate();

	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		age--;
	}

	return age;
}

/**
 * Calculate years of experience based on start year
 * @param startYear Year when experience started
 * @returns Years of experience as number
 */
export function calculateExperience(startYear: number): number {
	const currentYear = new Date().getFullYear();
	return currentYear - startYear;
}

/**
 * Parse date string in various formats
 * @param dateStr Date string in various formats (YYYY, MM/DD/YYYY, DD.MM.YYYY, etc.)
 * @returns Date object
 */
export function parseDate(dateStr: string): Date {
	// Handle year-only format
	if (/^\d{4}$/.test(dateStr)) {
		return new Date(`${dateStr}-01-01`);
	}

	// Handle DD.MM.YYYY format (European)
	if (/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(dateStr)) {
		const [day, month, year] = dateStr.split(".").map(Number);
		return new Date(year, month - 1, day);
	}

	// Handle DD/MM/YYYY format (European with slashes)
	if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
		const [day, month, year] = dateStr.split("/").map(Number);
		return new Date(year, month - 1, day);
	}

	// Handle MM/DD/YYYY format (US)
	if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
		return new Date(dateStr);
	}

	// Default fallback
	return new Date(dateStr);
}

/**
 * Format date according to locale and format type
 * @param date Date object or string to format
 * @param locale Current locale (en, pl)
 * @param format Format type (short, medium, long)
 * @returns Formatted date string
 */
export function formatDate(
	date: Date | string,
	locale: Locale,
	format: "short" | "medium" | "long" = "medium",
): string {
	const dateObj = typeof date === "string" ? parseDate(date) : date;

	// Handle "present" special case
	if (typeof date === "string" && date.toLowerCase() === "present") {
		return locale === "en" ? "Present" : "Obecnie";
	}

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
	};

	if (format === "medium" || format === "long") {
		options.month = format === "medium" ? "short" : "long";
	}

	if (format === "short") {
		options.month = "2-digit";
		options.day = "2-digit";
	}

	return new Intl.DateTimeFormat(
		locale === "en" ? "en-US" : "pl-PL",
		options,
	).format(dateObj);
}
