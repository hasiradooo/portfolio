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
							{dict?.common?.readyToGetStarted?.title ||
								"Ready to Get Started?"}
						</h3>
						<p className="text-gray-600 dark:text-gray-400 text-sm">
							{dict?.common?.readyToGetStarted?.description ||
								"Let's discuss your project and create something amazing together."}
						</p>
					</div>
					<Button asChild size={"xl"} className="max-sm:w-full">
						<Link
							href="/contact"
							className="flex items-center justify-center gap-2"
						>
							{dict?.common?.readyToGetStarted?.button || "Contact Me"}
						</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}
