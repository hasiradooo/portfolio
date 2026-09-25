// Patreon API integration for fetching supporter data
// Based on Patreon API v2 documentation

export interface PatreonTier {
	id: string;
	title: string;
	amount_cents: number;
	description?: string;
}

export interface PatreonSupporter {
	id: string;
	email: string;
	full_name: string;
	image_url?: string;
	currently_entitled_tiers: PatreonTier[];
	lifetime_support_cents: number;
	pledge_relationship_start?: string;
	patron_status: "active_patron" | "declined_patron" | "former_patron";
}

export interface PatreonData {
	supporters: PatreonSupporter[];
}

// Mock data for development - matches real Patreon API structure
function getMockPatreonData(): PatreonData {
	return {
		supporters: [
			{
				id: "1",
				email: "supporter1@example.com",
				full_name: "Alice Johnson",
				image_url:
					"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
				currently_entitled_tiers: [
					{
						id: "tier1",
						title: "Bronze Supporter",
						amount_cents: 500,
						description: "Basic support tier",
					},
				],
				lifetime_support_cents: 2500,
				pledge_relationship_start: "2023-01-15T00:00:00Z",
				patron_status: "active_patron",
			},
			{
				id: "2",
				email: "supporter2@example.com",
				full_name: "Bob Smith",
				image_url:
					"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
				currently_entitled_tiers: [
					{
						id: "tier2",
						title: "Silver Supporter",
						amount_cents: 1000,
						description: "Enhanced support tier",
					},
				],
				lifetime_support_cents: 8000,
				pledge_relationship_start: "2022-11-20T00:00:00Z",
				patron_status: "active_patron",
			},
			{
				id: "3",
				email: "supporter3@example.com",
				full_name: "Carol Davis",
				image_url:
					"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
				currently_entitled_tiers: [
					{
						id: "tier3",
						title: "Gold Supporter",
						amount_cents: 2500,
						description: "Premium support tier",
					},
				],
				lifetime_support_cents: 15000,
				pledge_relationship_start: "2022-08-10T00:00:00Z",
				patron_status: "active_patron",
			},
		],
	};
}

// Fetch Patreon supporters data
// In production, this would use OAuth and the Patreon API
export async function fetchPatreonSupporters(): Promise<PatreonData> {
	// Check for Patreon access token in environment
	const accessToken = process.env.PATREON_ACCESS_TOKEN;

	if (!accessToken) {
		console.log(
			"No Patreon access token found, returning empty supporters data",
		);
		return { supporters: [] };
	}

	try {
		// In production, this would make actual API calls to:
		// https://api.patreon.com/oauth2/v2/campaigns/{campaign_id}/members
		// ?include=currently_entitled_tiers&fields[tier]=title,amount_cents,description&fields[member]=email,full_name,image_url,lifetime_support_cents,pledge_relationship_start,patron_status

		console.log(
			"Patreon API integration not yet implemented, returning empty supporters data",
		);
		return { supporters: [] };
	} catch (error) {
		console.error("Error fetching Patreon data:", error);
		return { supporters: [] };
	}
}

// Parse Patreon API response (for future implementation)
export function parsePatreonData(): PatreonData {
	// This would parse the actual Patreon API JSON:API response
	// For now, return mock data
	return getMockPatreonData();
}
