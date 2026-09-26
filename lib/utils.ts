import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

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
