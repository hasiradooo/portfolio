import Link from "next/link";
import { OutlineArrowRight } from "@/icons/Icons";
import { useLanguage } from "@/app/providers/language-provider";
import { getDictionary } from "@/translations/i18n";

const getStatusColor = (status: string) => {
	switch (status.toLowerCase()) {
		case "completed":
			return "bg-green-500/10 text-green-700 dark:text-green-300";
		case "archived":
			return "bg-gray-500/10 text-gray-700 dark:text-gray-300";
		case "concept":
			return "bg-blue-500/10 text-blue-700 dark:text-blue-300";
		case "on hold":
			return "bg-purple-500/10 text-purple-700 dark:text-purple-300";
		case "in development":
		default:
			return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300";
	}
};

export default function FeaturedProjectsSection() {
	const { locale } = useLanguage();
	const dict = getDictionary(locale);

	// Get the first 3 projects from translations
	const featuredProjects = dict.projects.data.slice(0, 3);

	return (
		<section id="projects" className="relative">
			<div className="space-y-3">
				<div className="flex items-center justify-between mb-6">
					<div className="border-l-4 border-foreground pl-4">
						<h2 className="text-xl font-bold text-foreground uppercase tracking-wider mb-2">
							{dict.home.featuredProjects.title}
						</h2>
						<p className="text-sm text-muted-foreground">
							{dict.home.featuredProjects.subtitle}
						</p>
					</div>
					<Link
						href="/projects"
						className="text-sm text-foreground/60 hover:text-foreground transition-colors uppercase tracking-wider flex items-center gap-1 pr-6 group"
					>
						{dict.common.nav.projects}
						<OutlineArrowRight
							size={12}
							className="group-hover:translate-x-1 transition-transform duration-200"
						/>
					</Link>
				</div>

				<div className="grid grid-cols-1 gap-px bg-foreground/[0.02]">
					{featuredProjects.map((project) => (
						<Link
							key={project.slug}
							href={`/projects/${project.slug}`}
							className="block bg-background group relative focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-ring"
						>
							<div className="p-6 space-y-4 group-hover:bg-foreground/[0.02] transition-colors">
								{/* Header */}
								<div className="flex items-start justify-between">
									<div className="space-y-2">
										<h3 className="font-bold text-foreground uppercase tracking-wider group-hover:text-primary transition-colors">
											{project.title}
										</h3>
										<div className="flex items-center gap-2">
											<span className="text-[10px] font-medium px-2 py-0.5 bg-foreground/[0.05] text-foreground/80 uppercase tracking-wider">
												{project.category}
											</span>
											{project.status.map((status, index) => (
												<span
													key={index}
													className={`text-[10px] font-medium px-2 py-0.5 uppercase tracking-wider ${getStatusColor(status)}`}
												>
													{status}
												</span>
											))}
										</div>
									</div>
									<div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
										<OutlineArrowRight size={14} className="text-primary" />
									</div>
								</div>

								{/* Description */}
								<p className="text-sm text-foreground/60 leading-relaxed">
									{project.description.length > 120
										? `${project.description.substring(0, 120)}...`
										: project.description}
								</p>

								{/* Technologies */}
								<div className="flex flex-wrap items-center gap-2">
									{project.technologies.slice(0, 3).map((tech, index) => (
										<span
											key={index}
											className="text-[10px] font-medium text-foreground/60 bg-foreground/[0.02] px-2 py-0.5 uppercase tracking-wider"
										>
											{tech}
										</span>
									))}
									{project.technologies.length > 3 && (
										<span className="text-[10px] font-medium text-foreground/60 px-2 py-0.5">
											+{project.technologies.length - 3} more
										</span>
									)}
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
