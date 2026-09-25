import { Badge } from "@/components/ui/badge";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

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
	technologies: string[];
	projects?: ExperienceProject[];
	achievements?: string[];
}

interface TimelineProps {
	experiences: Experience[];
}

export function Timeline({ experiences }: TimelineProps) {
	return (
		<div className="relative">
			{/* Timeline line */}
			<div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

			{/* Experience entries */}
			<div className="space-y-12">
				{experiences.map((experience, index) => (
					<div key={index} className="relative pl-16">
						{/* Timeline dot */}
						<div className="absolute left-[29px] -translate-x-1/2 w-4 h-4 rounded-full border-2 border-black dark:border-white bg-background" />

						{/* Experience card */}
						<Collapsible className="group relative">
							<CollapsibleTrigger className="w-full">
								{/* Header */}
								<div className="flex items-baseline justify-between mb-2 text-left">
									<div className="flex items-center gap-3">
										<h3 className="text-lg font-bold">{experience.company}</h3>
										<Badge
											variant={
												experience.type === "Full-time"
													? "default"
													: "secondary"
											}
										>
											{experience.type}
										</Badge>
									</div>
									<div className="flex items-center gap-2">
										<time className="text-sm text-muted-foreground font-mono">
											{experience.startDate} — {experience.endDate}
										</time>
										<ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
									</div>
								</div>

								{/* Position */}
								<h4 className="text-base font-medium mb-4">
									{experience.position}
								</h4>

								{/* Description */}
								<p className="text-sm text-muted-foreground">
									{experience.description}
								</p>
							</CollapsibleTrigger>

							<CollapsibleContent className="mt-6 space-y-6">
								{/* Achievements */}
								<div className="mt-4">
									<h5 className="text-sm font-semibold">Key Achievements</h5>
									<ul className="space-y-2 ml-6">
										{experience.achievements?.map((achievement, i) => (
											<li
												key={i}
												className="flex items-start gap-2 text-sm relative"
											>
												<span className="absolute -left-4 top-1/2 size-1.5 mt-0.25 -translate-y-1/2 bg-foreground flex-shrink-0" />
												<span>{achievement}</span>
											</li>
										))}
									</ul>
								</div>

								{/* Projects (if any) */}
								{experience.projects && (
									<div>
										<h5 className="text-sm font-semibold mb-2">
											Notable Projects
										</h5>
										<div className="space-y-3">
											{experience.projects.map((project, i) => (
												<div key={i} className="text-sm">
													<h6 className="font-medium">{project.name}</h6>
													<p className="text-muted-foreground">
														{project.description}
													</p>
													{project.link && (
														<a
															href={project.link}
															target="_blank"
															rel="noopener noreferrer"
															className="text-xs text-primary hover:underline mt-1 inline-block"
														>
															View Project →
														</a>
													)}
												</div>
											))}
										</div>
									</div>
								)}
							</CollapsibleContent>
						</Collapsible>
					</div>
				))}
			</div>
		</div>
	);
}
