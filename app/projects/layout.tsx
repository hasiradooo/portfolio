"use client";

import { SectionSeparator } from "@/components/sections/SectionSeparator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/app/providers/language-provider";

export default function ProjectLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { dict } = useLanguage();

	return (
		<div className="space-y-8">
			{children}

			<SectionSeparator />

			{/* Call to Action */}
			<section id="cta">
				<div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-6">
					<div>
						<h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
							{dict?.projects?.cta?.title || "Support Our Work"}
						</h3>
						<p className="text-gray-600 dark:text-gray-400 text-sm">
							{dict?.projects?.cta?.description ||
								"Support us to get exclusive updates and rewards"}
						</p>
					</div>
					<Button asChild size={"xl"}>
						<Link
							href="https://patreon.com/rabbittale"
							target="_blank"
							rel="noopener noreferrer"
							className="max-sm:w-full"
						>
							{dict?.projects?.cta?.patreon || "Patreon"}
						</Link>
					</Button>
					<Button asChild size={"xl"}>
						<Link
							href={"https://github.com/sponsors/rabbit-tale-co"}
							target="_blank"
							rel="noopener noreferrer"
							className="max-sm:w-full"
						>
							{dict?.projects?.cta?.githubSponsors || "Github Sponsors"}
						</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}
