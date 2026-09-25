import { Badge } from "@/components/ui/badge";
import { OutlineArrowRight } from "@/icons/Icons";
import Link from "next/link";
import { useLanguage } from "@/app/providers/language-provider";
import { formatDate } from "@/lib/utils";

interface ExperienceProject {
	name: string;
	description: string;
	link: string;
}

interface Experience {
	company: string;
	position: string;
	type: string;
	startDate: string;
	endDate: string;
	description: string;
	achievements: string[];
	tags: string[];
	projects?: ExperienceProject[];
}

interface ExperienceCardProps {
	experience: Experience;
	showDetails?: boolean;
}

function ExperienceCard({
	experience,
	showDetails = false,
}: ExperienceCardProps) {
	const { dict, locale } = useLanguage();

	return (
		<div className="group relative">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4">
				<h3 className="text-lg font-bold">{experience.company}</h3>
				<time className="text-sm text-muted-foreground font-mono shrink-0">
					{formatDate(experience.startDate, locale, "medium")} —{" "}
					{formatDate(experience.endDate, locale, "medium")}
				</time>
			</div>

			{/* Position & Type */}
			<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-2 sm:mt-1 mb-4">
				<h4 className="text-base font-medium">{experience.position}</h4>
				<Badge variant="default" className="font-mono text-[10px] w-fit">
					{experience.type}
				</Badge>
			</div>

			{/* Description */}
			<p className="text-sm text-muted-foreground">{experience.description}</p>

			{showDetails ? (
				<>
					{/* Projects */}
					{experience.projects && experience.projects.length > 0 && (
						<div className="mt-8 sm:mt-6">
							<h5 className="text-sm font-semibold mb-4 sm:mb-3">
								{dict.home.experience.projectsLabel}
							</h5>
							<ul className="space-y-6 sm:space-y-4">
								{experience.projects.map((project, i) => (
									<li key={i} className="text-sm">
										<h6 className="font-medium mb-2 sm:mb-1">{project.name}</h6>
										<p className="text-muted-foreground leading-relaxed">
											{project.description}
										</p>
										{project.link && (
											<Link
												href={project.link}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2 focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-ring"
											>
												{dict.home.experience.viewProject}
												<OutlineArrowRight size={16} />
											</Link>
										)}
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Achievements */}
					{experience.achievements && experience.achievements.length > 0 && (
						<div className="mt-8 sm:mt-6">
							<h5 className="text-sm font-semibold mb-4 sm:mb-3">
								{dict.home.experience.achievementsLabel}
							</h5>
							<ul className="space-y-4 sm:space-y-2.5">
								{experience.achievements.map((achievement, i) => (
									<li
										key={i}
										className="flex items-start gap-3 sm:gap-2.5 text-sm relative pl-6"
									>
										<span className="absolute left-0 top-2.5 size-1.5 bg-foreground flex-shrink-0" />
										<span className="leading-relaxed">{achievement}</span>
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Tags */}
					{experience.tags && experience.tags.length > 0 && (
						<div className="mt-8 sm:mt-6">
							<div className="flex flex-wrap gap-2 sm:gap-1.5">
								{experience.tags.map((tag, i) => (
									<Badge
										key={i}
										variant="secondary"
										className="text-xs font-mono uppercase tracking-wider"
									>
										{tag}
									</Badge>
								))}
							</div>
						</div>
					)}
				</>
			) : (
				<div className="mt-6">
					<Link
						href={`/experience#${experience.company.toLowerCase().replace(/\s+/g, "-")}`}
						className="text-primary hover:underline inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-offset-2 focus-visible:ring-ring"
					>
						{dict.home.experience.showDetails}
						<OutlineArrowRight size={16} />
					</Link>
				</div>
			)}
		</div>
	);
}

interface ExperienceTimelineProps {
	experiences: Experience[];
	showDetails?: boolean;
	maxItems?: number;
}

export function ExperienceTimeline({
	experiences,
	showDetails = false,
	maxItems,
}: ExperienceTimelineProps) {
	const { dict } = useLanguage();
	const displayedExperiences = maxItems
		? experiences.slice(0, maxItems)
		: experiences;

	// Ensure we have experiences to render
	if (!experiences || experiences.length === 0) {
		return <div className="py-4">No experiences to display</div>;
	}

	return (
		<div className="pt-2 pb-6 px-4 sm:px-6">
			{/* Experience entries */}
			<div className="space-y-12 sm:space-y-6 relative">
				{/* Timeline line */}
				<div className="absolute left-0 top-2 h-[calc(100%+1rem)] bottom-0 w-px bg-border" />
				{displayedExperiences.map((experience, index) => (
					<div
						key={index}
						className="relative pl-8 sm:pl-6"
						id={experience.company.toLowerCase().replace(/\s+/g, "-")}
					>
						{/* Timeline dot */}
						<div className="absolute left-0 top-2 -translate-x-2 size-4 rounded-full bg-background ring-2 ring-foreground" />

						<ExperienceCard experience={experience} showDetails={showDetails} />
					</div>
				))}

				{maxItems && experiences.length > maxItems && (
					<div className="text-center mt-8">
						<Link
							href="/experience"
							className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:underline uppercase tracking-wider"
						>
							{dict?.home?.experience?.viewFullExperience ||
								"View Full Experience"}
							<span className="text-xs">→</span>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
