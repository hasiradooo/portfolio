import { NextResponse } from "next/server";
import { fetchGitHubSponsors } from "@/lib/github-sponsors";

export async function GET() {
	try {
		const sponsorsData = await fetchGitHubSponsors("rabbit-tale-co");
		return NextResponse.json(sponsorsData);
	} catch (error) {
		console.error("Error in sponsors API route:", error);
		return NextResponse.json(
			{ sponsors: [], totalCount: 0, totalRecurringMonthlyPriceInDollars: 0 },
			{ status: 500 },
		);
	}
}
