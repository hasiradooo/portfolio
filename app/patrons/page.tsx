"use client";

import { OutlineArrowRight } from "@/icons/Icons";
import Link from "next/link";
import { SectionSeparator } from "@/components/sections/SectionSeparator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/app/providers/language-provider";
import { Section } from "@/components/section";
import { type GitHubSponsor } from "@/lib/github-sponsors";
import { type PatreonSupporter } from "@/lib/patreon-supporters";
import {
	Empty,
	EmptyHeader,
	EmptyTitle,
	EmptyDescription,
	EmptyMedia,
} from "@/components/ui/empty";
import { HeartIcon, StarIcon } from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function Patrons() {
	const { dict } = useLanguage();
	const [githubSponsors, setGithubSponsors] = useState<GitHubSponsor[]>([]);
	const [patreonSupporters, setPatreonSupporters] = useState<
		PatreonSupporter[]
	>([]);
	const [loading, setLoading] = useState(true);
	const [showAllGithub, setShowAllGithub] = useState(false);
	const [showAllPatreon, setShowAllPatreon] = useState(false);
	const [githubSortBy, setGithubSortBy] = useState<string>("amount-desc");
	const [patreonSortBy, setPatreonSortBy] = useState<string>("amount-desc");
	const [githubFilterTier, setGithubFilterTier] = useState<string>("all");
	const [patreonFilterTier, setPatreonFilterTier] = useState<string>("all");

	const ITEMS_PER_PAGE = 6;

	// Helper functions for filtering and sorting
	const filterAndSortGithubSponsors = useCallback(
		(sponsors: GitHubSponsor[]) => {
			let filtered = sponsors;

			// Filter by tier
			if (githubFilterTier !== "all") {
				filtered = filtered.filter((sponsor) => {
					if (githubFilterTier === "custom") {
						return sponsor.tier.isCustomAmount;
					}
					return sponsor.tier.name === githubFilterTier;
				});
			}

			// Sort
			return filtered.sort((a, b) => {
				switch (githubSortBy) {
					case "amount-desc":
						return b.tier.monthlyPriceInDollars - a.tier.monthlyPriceInDollars;
					case "amount-asc":
						return a.tier.monthlyPriceInDollars - b.tier.monthlyPriceInDollars;
					case "date-desc":
						return (
							new Date(b.tierSelectedAt).getTime() -
							new Date(a.tierSelectedAt).getTime()
						);
					case "date-asc":
						return (
							new Date(a.tierSelectedAt).getTime() -
							new Date(b.tierSelectedAt).getTime()
						);
					case "name-asc":
						return a.name.localeCompare(b.name);
					case "name-desc":
						return b.name.localeCompare(a.name);
					default:
						return 0;
				}
			});
		},
		[githubFilterTier, githubSortBy],
	);

	const filterAndSortPatreonSupporters = useCallback(
		(supporters: PatreonSupporter[]) => {
			let filtered = supporters;

			// Filter by tier
			if (patreonFilterTier !== "all") {
				filtered = filtered.filter((supporter) => {
					const tierTitle =
						supporter.currently_entitled_tiers[0]?.title || "Supporter";
					return tierTitle === patreonFilterTier;
				});
			}

			// Sort
			return filtered.sort((a, b) => {
				switch (patreonSortBy) {
					case "amount-desc":
						return (
							(b.currently_entitled_tiers[0]?.amount_cents || 0) -
							(a.currently_entitled_tiers[0]?.amount_cents || 0)
						);
					case "amount-asc":
						return (
							(a.currently_entitled_tiers[0]?.amount_cents || 0) -
							(b.currently_entitled_tiers[0]?.amount_cents || 0)
						);
					case "date-desc":
						return (
							new Date(b.pledge_relationship_start || "").getTime() -
							new Date(a.pledge_relationship_start || "").getTime()
						);
					case "date-asc":
						return (
							new Date(a.pledge_relationship_start || "").getTime() -
							new Date(b.pledge_relationship_start || "").getTime()
						);
					case "name-asc":
						return a.full_name.localeCompare(b.full_name);
					case "name-desc":
						return b.full_name.localeCompare(a.full_name);
					default:
						return 0;
				}
			});
		},
		[patreonFilterTier, patreonSortBy],
	);

	// Get unique tiers for filter options
	const getGithubTiers = useMemo(() => {
		const tiers = new Set<string>();
		githubSponsors.forEach((sponsor) => {
			if (sponsor.tier.isCustomAmount) {
				tiers.add("custom");
			} else {
				tiers.add(sponsor.tier.name);
			}
		});
		return Array.from(tiers);
	}, [githubSponsors]);

	const getPatreonTiers = useMemo(() => {
		const tiers = new Set<string>();
		patreonSupporters.forEach((supporter) => {
			const tierTitle =
				supporter.currently_entitled_tiers[0]?.title || "Supporter";
			tiers.add(tierTitle);
		});
		return Array.from(tiers);
	}, [patreonSupporters]);

	// Apply filters and sorting
	const filteredGithubSponsors = useMemo(
		() => filterAndSortGithubSponsors(githubSponsors),
		[githubSponsors, filterAndSortGithubSponsors],
	);

	const filteredPatreonSupporters = useMemo(
		() => filterAndSortPatreonSupporters(patreonSupporters),
		[patreonSupporters, filterAndSortPatreonSupporters],
	);

	useEffect(() => {
		const loadData = async () => {
			try {
				const [sponsorsResponse, patreonResponse] = await Promise.all([
					fetch("/api/sponsors"),
					fetch("/api/patreon"),
				]);

				const sponsorsData = await sponsorsResponse.json();
				const patreonData = await patreonResponse.json();

				console.log("Sponsors data from API:", sponsorsData);
				console.log("Patreon data from API:", patreonData);

				setGithubSponsors(sponsorsData.sponsors || []);
				setPatreonSupporters(patreonData.supporters || []);
			} catch (error) {
				console.error("Failed to load sponsor data:", error);
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, []);

	return (
		<div className="[&>section:not(#hero)]:pt-6 [&>section:is(:last-child)]:pb-6">
			{/* Header */}
			<Section
				id="patrons-header"
				title={dict.patrons?.title || "Patrons & Supporters"}
				description={
					dict.patrons?.description ||
					"Thank you to all the amazing people who support my work through GitHub Sponsors and Patreon. Your support helps me continue creating open-source projects and content."
				}
			>
				{/* Header content */}
			</Section>

			<SectionSeparator />

			{/* GitHub Sponsors Section */}
			<section id="github-sponsors">
				<div className="space-y-3">
					<div className="border-l-4 border-black dark:border-white pl-4">
						<h2 className="text-lg font-mono font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
							{dict.patrons?.githubSponsors?.title || "GitHub Sponsors"}
						</h2>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							{dict.patrons?.githubSponsors?.description ||
								"Special thanks to my GitHub Sponsors who help fund my open-source contributions."}
						</p>
					</div>

					<div className="mb-6 px-5">
						<Link
							href="https://github.com/sponsors/rabbit-tale-co"
							target="_blank"
							className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors group"
						>
							{dict.patrons?.githubSponsors?.becomeASponsor ||
								"Become a GitHub Sponsor"}
							<OutlineArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</div>

					{loading ? (
						<div className="flex items-center justify-center py-12">
							<Spinner className="size-6" />
							<span className="ml-3 text-gray-500 dark:text-gray-400">
								{dict.patrons?.githubSponsors?.loading ||
									"Loading GitHub sponsors..."}
							</span>
						</div>
					) : githubSponsors.length > 0 ? (
						<>
							{/* Filter and Sort Controls */}
							<div className="flex flex-wrap gap-4 mb-6 px-5">
								<div className="flex items-center gap-2">
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
										{dict.patrons?.common?.filterBy || "Filter by"}:
									</span>
									<Select
										value={githubFilterTier}
										onValueChange={setGithubFilterTier}
									>
										<SelectTrigger className="w-40">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">
												{dict.patrons?.common?.allTiers || "All Tiers"}
											</SelectItem>
											{getGithubTiers.map((tier) => (
												<SelectItem key={tier} value={tier}>
													{tier === "custom"
														? dict.patrons?.common?.custom || "Custom"
														: tier}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
										{dict.patrons?.common?.sortBy || "Sort by"}:
									</span>
									<Select value={githubSortBy} onValueChange={setGithubSortBy}>
										<SelectTrigger className="w-48">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="amount-desc">
												{dict.patrons?.common?.amount || "Amount"} -{" "}
												{dict.patrons?.common?.highToLow || "High to Low"}
											</SelectItem>
											<SelectItem value="amount-asc">
												{dict.patrons?.common?.amount || "Amount"} -{" "}
												{dict.patrons?.common?.lowToHigh || "Low to High"}
											</SelectItem>
											<SelectItem value="date-desc">
												{dict.patrons?.common?.date || "Date"} -{" "}
												{dict.patrons?.common?.newest || "Newest"}
											</SelectItem>
											<SelectItem value="date-asc">
												{dict.patrons?.common?.date || "Date"} -{" "}
												{dict.patrons?.common?.oldest || "Oldest"}
											</SelectItem>
											<SelectItem value="name-asc">
												{dict.patrons?.common?.name || "Name"} - A-Z
											</SelectItem>
											<SelectItem value="name-desc">
												{dict.patrons?.common?.name || "Name"} - Z-A
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-px pt-px bg-foreground/[0.02]">
								{(showAllGithub
									? filteredGithubSponsors
									: filteredGithubSponsors.slice(0, ITEMS_PER_PAGE)
								).map((sponsor, index) => (
									<Link
										key={sponsor.id}
										href={`https://github.com/${sponsor.login}`}
										target="_blank"
										className={`group bg-background p-6 hover:bg-foreground/[0.02] focus-visible:outline-none focus-visible:z-10 focus-visible:bg-foreground/[0.02] transition-colors focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-ring ${index === (showAllGithub ? filteredGithubSponsors : filteredGithubSponsors.slice(0, ITEMS_PER_PAGE)).length - 1 && (showAllGithub ? filteredGithubSponsors : filteredGithubSponsors.slice(0, ITEMS_PER_PAGE)).length % 2 !== 0 && "sm:col-span-2"}`}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-4">
												<Avatar className="size-12">
													<AvatarImage
														src={sponsor.avatarUrl}
														alt={sponsor.name}
													/>
													<AvatarFallback className="text-sm font-bold">
														{sponsor.name.charAt(0)}
													</AvatarFallback>
												</Avatar>
												<div className="space-y-1">
													<div className="font-mono text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
														{sponsor.name}
													</div>
													<div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
														{sponsor.tier.isCustomAmount
															? dict.patrons?.common?.custom || "Custom"
															: sponsor.tier.name}
													</div>
												</div>
											</div>
											<div className="text-right">
												<div className="text-lg font-bold text-gray-900 dark:text-gray-100">
													{sponsor.tier.monthlyPriceInDollars > 0
														? `$${sponsor.tier.monthlyPriceInDollars}${
																sponsor.tier.isOneTime
																	? ` ${dict.patrons?.common?.oneTime || "one-time"}`
																	: dict.patrons?.common?.perMonth || "/month"
															}`
														: "Sponsor"}
												</div>
												<div className="text-xs text-gray-500 mt-1">
													{dict.patrons?.common?.supportingSince ||
														"Supporting since"}{" "}
													{new Date(sponsor.tierSelectedAt).getFullYear()}
												</div>
											</div>
										</div>
									</Link>
								))}
							</div>
							{filteredGithubSponsors.length > ITEMS_PER_PAGE && (
								<div className="flex justify-center pt-6">
									<Button
										variant="outline"
										onClick={() => setShowAllGithub(!showAllGithub)}
										className="text-sm"
									>
										{showAllGithub
											? dict.patrons?.common?.showLess || "Show Less"
											: `${dict.patrons?.common?.showMore || "Show More"} (${filteredGithubSponsors.length - ITEMS_PER_PAGE} more)`}
									</Button>
								</div>
							)}
						</>
					) : (
						<Empty className="border-0 p-8">
							<EmptyHeader>
								<EmptyMedia variant="icon">
									<StarIcon />
								</EmptyMedia>
								<EmptyTitle>
									{dict.patrons?.githubSponsors?.emptyTitle ||
										"No GitHub Sponsors Yet"}
								</EmptyTitle>
								<EmptyDescription>
									{dict.patrons?.githubSponsors?.emptyDescription ||
										"Be the first to support my open-source work! Your sponsorship helps me continue creating and maintaining projects."}
								</EmptyDescription>
							</EmptyHeader>
						</Empty>
					)}
				</div>
			</section>

			<SectionSeparator />

			{/* Patreon Supporters Section */}
			<section id="patreon-supporters">
				<div className="space-y-3">
					<div className="border-l-4 border-black dark:border-white pl-4">
						<h2 className="text-lg font-mono font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
							{dict.patrons?.patreonSupporters?.title || "Patreon Supporters"}
						</h2>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							{dict.patrons?.patreonSupporters?.description ||
								"Thank you to my Patreon supporters who help make my work possible."}
						</p>
					</div>

					<div className="mb-6 px-5">
						<Link
							href="https://patreon.com/rabbit_tale_co"
							target="_blank"
							className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors group"
						>
							{dict.patrons?.patreonSupporters?.becomeASupporter ||
								"Become a Patreon Supporter"}
							<OutlineArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</div>

					{loading ? (
						<div className="flex items-center justify-center py-12">
							<Spinner className="size-6" />
							<span className="ml-3 text-gray-500 dark:text-gray-400">
								{dict.patrons?.patreonSupporters?.loading ||
									"Loading Patreon supporters..."}
							</span>
						</div>
					) : patreonSupporters.length > 0 ? (
						<>
							{/* Filter and Sort Controls */}
							<div className="flex flex-wrap gap-4 mb-6 px-5">
								<div className="flex items-center gap-2">
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
										{dict.patrons?.common?.filterBy || "Filter by"}:
									</span>
									<Select
										value={patreonFilterTier}
										onValueChange={setPatreonFilterTier}
									>
										<SelectTrigger className="w-40">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">
												{dict.patrons?.common?.allTiers || "All Tiers"}
											</SelectItem>
											{getPatreonTiers.map((tier) => (
												<SelectItem key={tier} value={tier}>
													{tier}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
										{dict.patrons?.common?.sortBy || "Sort by"}:
									</span>
									<Select
										value={patreonSortBy}
										onValueChange={setPatreonSortBy}
									>
										<SelectTrigger className="w-48">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="amount-desc">
												{dict.patrons?.common?.amount || "Amount"} -{" "}
												{dict.patrons?.common?.highToLow || "High to Low"}
											</SelectItem>
											<SelectItem value="amount-asc">
												{dict.patrons?.common?.amount || "Amount"} -{" "}
												{dict.patrons?.common?.lowToHigh || "Low to High"}
											</SelectItem>
											<SelectItem value="date-desc">
												{dict.patrons?.common?.date || "Date"} -{" "}
												{dict.patrons?.common?.newest || "Newest"}
											</SelectItem>
											<SelectItem value="date-asc">
												{dict.patrons?.common?.date || "Date"} -{" "}
												{dict.patrons?.common?.oldest || "Oldest"}
											</SelectItem>
											<SelectItem value="name-asc">
												{dict.patrons?.common?.name || "Name"} - A-Z
											</SelectItem>
											<SelectItem value="name-desc">
												{dict.patrons?.common?.name || "Name"} - Z-A
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-px pt-px bg-foreground/[0.02]">
								{(showAllPatreon
									? filteredPatreonSupporters
									: filteredPatreonSupporters.slice(0, ITEMS_PER_PAGE)
								).map((supporter, index) => {
									const name = supporter.full_name;
									const avatar = supporter.image_url;
									const tier =
										supporter.currently_entitled_tiers[0]?.title || "Supporter";
									const amount =
										(supporter.currently_entitled_tiers[0]?.amount_cents || 0) /
										100;
									const displayedSupporters = showAllPatreon
										? filteredPatreonSupporters
										: filteredPatreonSupporters.slice(0, ITEMS_PER_PAGE);

									return (
										<div
											key={supporter.id}
											className={`group bg-background p-6 hover:bg-foreground/[0.02] transition-colors ${index === displayedSupporters.length - 1 && displayedSupporters.length % 2 !== 0 && "sm:col-span-2"}`}
										>
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-4">
													<Avatar className="size-12">
														<AvatarImage src={avatar} alt={name} />
														<AvatarFallback className="text-sm font-bold">
															{name.charAt(0)}
														</AvatarFallback>
													</Avatar>
													<div className="space-y-1">
														<div className="font-mono text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
															{name}
														</div>
														<div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
															{tier}
														</div>
													</div>
												</div>
												<div className="text-right">
													<div className="text-lg font-bold text-gray-900 dark:text-gray-100">
														${amount.toFixed(2)}
														{dict.patrons?.common?.perMonth || "/month"}
													</div>
													<div className="text-xs text-gray-500 mt-1">
														{dict.patrons?.common?.supportingSince ||
															"Supporting since"}{" "}
														{new Date(
															supporter.pledge_relationship_start || "",
														).getFullYear()}
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
							{filteredPatreonSupporters.length > ITEMS_PER_PAGE && (
								<div className="flex justify-center pt-6">
									<Button
										variant="outline"
										onClick={() => setShowAllPatreon(!showAllPatreon)}
										className="text-sm"
									>
										{showAllPatreon
											? dict.patrons?.common?.showLess || "Show Less"
											: `${dict.patrons?.common?.showMore || "Show More"} (${filteredPatreonSupporters.length - ITEMS_PER_PAGE} more)`}
									</Button>
								</div>
							)}
						</>
					) : (
						<Empty className="border-0 p-8">
							<EmptyHeader>
								<EmptyMedia variant="icon">
									<HeartIcon />
								</EmptyMedia>
								<EmptyTitle>
									{dict.patrons?.patreonSupporters?.emptyTitle ||
										"No Patreon Supporters Yet"}
								</EmptyTitle>
								<EmptyDescription>
									{dict.patrons?.patreonSupporters?.emptyDescription ||
										"Be the first to support my work on Patreon! Your support helps me create more content and maintain my projects."}
								</EmptyDescription>
							</EmptyHeader>
						</Empty>
					)}
				</div>
			</section>

			<SectionSeparator />

			{/* Contact CTA */}
			<section id="cta">
				<div className="text-center py-6 px-6">
					<div className="space-y-4">
						<h2 className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
							{dict.home.cta.title}
						</h2>
						<p className="text-gray-600 dark:text-gray-400">
							{dict.home.cta.subtitle}
						</p>
						<div className="flex flex-col sm:flex-row gap-px bg-gray-200 dark:bg-background max-w-md mx-auto">
							<Link
								href="/contact"
								className="flex-1 bg-foreground text-background px-6 py-4 hover:bg-foreground/90 transition-colors text-sm font-bold uppercase tracking-wider"
							>
								{dict.home.cta.button}
							</Link>
							<Link
								href="/projects"
								className="flex-1 bg-background text-foreground px-6 py-4 hover:bg-foreground/[0.02] transition-colors text-sm font-bold uppercase tracking-wider border border-border"
							>
								{dict.common.nav.projects}
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
