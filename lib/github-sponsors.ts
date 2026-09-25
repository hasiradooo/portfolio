// GitHub Sponsors API integration
// Based on GitHub GraphQL API documentation and community examples

export interface GitHubSponsor {
	id: string;
	login: string;
	name: string;
	avatarUrl: string;
	websiteUrl?: string;
	tier: {
		id: string;
		name: string;
		description?: string;
		monthlyPriceInDollars: number;
		isOneTime: boolean;
		isCustomAmount: boolean;
	};
	tierSelectedAt: string;
}

export interface SponsorsData {
	sponsors: GitHubSponsor[];
	totalCount: number;
	totalRecurringMonthlyPriceInDollars: number;
}

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

// GraphQL query to fetch sponsors with detailed tier information
// Using sponsorshipsAsMaintainer to get actual sponsorship data including tiers
const SPONSORS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      sponsorsListing {
        id
        name
      }
      sponsorshipsAsMaintainer(first: 100, includePrivate: true) {
        totalCount
        nodes {
          createdAt
          privacyLevel
          tier {
            id
            name
            description
            monthlyPriceInDollars
            monthlyPriceInCents
            isOneTime
            isCustomAmount
          }
          sponsor {
            __typename
            id
            login
            name
            avatarUrl
            websiteUrl
          }
        }
      }
    }
  }
`;

export async function fetchGitHubSponsors(
	username: string,
): Promise<SponsorsData> {
	const token = process.env.GITHUB_TOKEN;

	console.log("Fetching GitHub sponsors for:", username);
	console.log("Token exists:", !!token);

	if (!token) {
		console.log("No GitHub token found, returning empty sponsors data");
		return {
			sponsors: [],
			totalCount: 0,
			totalRecurringMonthlyPriceInDollars: 0,
		};
	}

	try {
		const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: SPONSORS_QUERY,
				variables: { username },
			}),
		});

		console.log("GitHub API response status:", response.status);

		if (!response.ok) {
			throw new Error(`GitHub API responded with status: ${response.status}`);
		}

		const data = await response.json();
		console.log("GitHub API response data:", JSON.stringify(data, null, 2));

		if (data.errors) {
			console.error("GitHub GraphQL errors:", data.errors);
			return {
				sponsors: [],
				totalCount: 0,
				totalRecurringMonthlyPriceInDollars: 0,
			};
		}

		const parsedData = parseSponsorsData(data.data);
		console.log("Parsed sponsors data:", parsedData);
		return parsedData;
	} catch (error) {
		console.error("Error fetching GitHub sponsors:", error);
		return {
			sponsors: [],
			totalCount: 0,
			totalRecurringMonthlyPriceInDollars: 0,
		};
	}
}

// Define the expected structure of the GitHub GraphQL response
interface GitHubGraphQLResponse {
	user?: {
		sponsorshipsAsMaintainer?: {
			totalCount: number;
			nodes: Array<{
				createdAt: string;
				privacyLevel: string;
				tier: {
					id: string;
					name: string;
					description?: string;
					monthlyPriceInDollars: number;
					monthlyPriceInCents: number;
					isOneTime: boolean;
					isCustomAmount: boolean;
				};
				sponsor: {
					__typename: string;
					id: string;
					login: string;
					name: string;
					avatarUrl: string;
					websiteUrl?: string;
				};
			}>;
		};
	};
}

function parseSponsorsData(data: GitHubGraphQLResponse): SponsorsData {
	const sponsors: GitHubSponsor[] = [];
	let totalRecurringMonthlyPriceInDollars = 0;

	if (data.user?.sponsorshipsAsMaintainer?.nodes) {
		for (const sponsorship of data.user.sponsorshipsAsMaintainer.nodes) {
			// Include all sponsorships with available sponsor data (both public and private)
			if (sponsorship.sponsor) {
				const sponsor = sponsorship.sponsor;
				const tier = sponsorship.tier;

				// Handle tier information - some sponsors may not have tier data available
				const tierInfo = tier
					? {
							id: tier.id || "sponsor-tier",
							name: tier.name || "Sponsor",
							description: tier.description || "GitHub Sponsor",
							monthlyPriceInDollars: tier.monthlyPriceInDollars || 0,
							isOneTime: tier.isOneTime || false,
							isCustomAmount: tier.isCustomAmount || false,
						}
					: {
							// Fallback for sponsors without tier information
							id: "basic-sponsor",
							name: "Sponsor",
							description: "GitHub Sponsor",
							monthlyPriceInDollars: 0,
							isOneTime: false,
							isCustomAmount: false,
						};

				sponsors.push({
					id: sponsor.id || sponsor.login,
					login: sponsor.login,
					name: sponsor.name || sponsor.login,
					avatarUrl: sponsor.avatarUrl,
					websiteUrl: sponsor.websiteUrl,
					tier: tierInfo,
					tierSelectedAt: sponsorship.createdAt || new Date().toISOString(),
				});

				// Add to total if it's a recurring sponsorship
				if (tier && !tier.isOneTime && tier.monthlyPriceInDollars) {
					totalRecurringMonthlyPriceInDollars += tier.monthlyPriceInDollars;
				}
			}
		}
	}

	return {
		sponsors,
		totalCount: data.user?.sponsorshipsAsMaintainer?.totalCount || 0,
		totalRecurringMonthlyPriceInDollars,
	};
}
