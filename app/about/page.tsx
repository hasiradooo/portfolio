"use client";

import { OutlineArrowRight } from "@/icons/Icons";
import Link from "next/link";
import { SectionSeparator } from "@/components/sections/SectionSeparator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { calculateAge, calculateExperience } from "@/lib/utils";
import { useLanguage } from "@/app/providers/language-provider";
import { ExperienceTimeline } from "@/components/sections/Experience";

const startYear = 2016;

export default function About() {
	const { dict } = useLanguage();
	const age = calculateAge("2001-07-11");
	const experience = calculateExperience(startYear);

	const skills = [
		{
			category: dict.about.skills.design.title,
			items: dict.about.skills.design.items,
		},
		{
			category: dict.about.skills.development.title,
			items: dict.about.skills.development.items,
		},
		{
			category: dict.about.skills.tools.title,
			items: dict.about.skills.tools.items,
		},
	];

	return (
		<>
			{/* Header */}
			<section id="about-header">
				<div className="border-l-4 border-black dark:border-white pl-4">
					<h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
						{dict.about.title}
					</h1>
				</div>

				<div className="space-y-px bg-gray-200 dark:bg-background">
					<div className="bg-background p-6">
						<div className="flex items-center gap-6 mb-6">
							<Avatar className="size-16 rounded-none">
								<AvatarImage src="https://github.com/rabbit-tale-co.png" />
								<AvatarFallback className="rounded-none">KG</AvatarFallback>
							</Avatar>
							<div className="space-y-2">
								<h2 className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
									{dict.about.name}
								</h2>
								<p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
									{dict.about.role}
								</p>
							</div>
						</div>

						<div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm">
							<p className="leading-relaxed">
								{dict.about.bio.intro.replace("{age}", age.toString())}
							</p>

							<p className="leading-relaxed">{dict.about.bio.projects}</p>
						</div>
					</div>

					<div className="bg-background p-6">
						<div className="flex items-center gap-6">
							<div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								{dict.about.experience.label}
							</div>
							<Link
								href="/experience"
								className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider hover:text-primary transition-colors group flex items-center gap-2 focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-offset-4 focus-visible:ring-ring"
							>
								{experience}+ {dict.about.experience.years}
								<span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity group-focus-within:opacity-100">
									<OutlineArrowRight
										size={12}
										className="group-hover:translate-x-1 transition-transform duration-200"
									/>
								</span>
							</Link>
							<div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
								{dict.about.experience.since} 2016
							</div>
							<Link
								href="/cv"
								className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider hover:text-primary transition-colors group flex items-center gap-2 focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-offset-4 focus-visible:ring-ring"
							>
								{dict.cv?.title || "CV"}
								<span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity group-focus-within:opacity-100">
									<OutlineArrowRight
										size={12}
										className="group-hover:translate-x-1 transition-transform duration-200"
									/>
								</span>
							</Link>
						</div>
					</div>
				</div>
			</section>

			<SectionSeparator />

			{/* Skills */}
			<section id="skills">
				<div className="border-l-4 border-foreground pl-4 mb-3">
					<h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
						{dict.about.skills.title}
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/[0.02] border-t border-border">
					{skills.map((skill, index) => (
						<div key={index} className="bg-background p-6">
							<h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider text-sm mb-4">
								{skill.category}
							</h3>
							<div className="space-y-2">
								{skill.items.map((item, itemIndex) => (
									<div
										key={itemIndex}
										className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider"
									>
										{item}
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</section>

			<SectionSeparator />

			{/* Experience */}
			<section id="experience">
				<div className="border-l-4 border-black dark:border-white mb-3 pl-4">
					<h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2">
						{dict.experience.title}
					</h1>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						{dict.experience.subtitle}
					</p>
				</div>

				<SectionSeparator />

				<ExperienceTimeline
					experiences={dict.experience.data}
					showDetails={true}
				/>
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
		</>
	);
}
