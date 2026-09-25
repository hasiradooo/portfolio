import Link from "next/link";
import Image from "next/image";
import { OutlineArrowRight } from "@/icons/Icons";
import { Badge } from "@/components/ui/badge";
import { getStatusVariant } from "@/lib/utils";

interface Project {
	slug: string;
	title: string;
	description: string;
	category: string[];
	status: string[];
	technologies: string[];
	links?: Array<{
		name: string;
		url: string;
		description?: string;
	}>;
	thumbnail?: {
		square?: {
			src: string;
			alt: string;
			blur?: string;
		};
		large?: {
			src: string;
			alt: string;
			blur?: string;
		};
	};
	content?: {
		about: string[];
		features?: string[];
		development?: string;
	};
	details?: {
		role: string;
		timeline: string;
		platform: string;
	};
}

interface ProjectCardProps {
	project: Project;
	variant: "featured" | "compact";
	thumbnailType?: "square" | "large";
}

export function ProjectCard({
	project,
	variant,
	thumbnailType = "square",
}: ProjectCardProps) {
	return (
		<div className="bg-background">
			<Link href={`/projects/${project.slug}`} className="block group">
				{variant === "featured" ? (
					<div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-px hover:bg-foreground/[0.02] transition-colors focus-within:outline-none focus-within:z-10 focus-visible:bg-foreground/[0.02] focus-visible:ring-2  focus-visible:ring-ring">
						{/* Thumbnail */}
						<div className="relative aspect-video sm:aspect-square bg-foreground/[0.02] overflow-hidden">
							{project.thumbnail && project.thumbnail[thumbnailType] ? (
								<Image
									src={project.thumbnail[thumbnailType].src}
									alt={project.thumbnail[thumbnailType].alt}
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-300"
									placeholder={
										project.thumbnail[thumbnailType].blur ? "blur" : "empty"
									}
									blurDataURL={project.thumbnail[thumbnailType].blur}
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center p-4">
									<span className="text-gray-400 dark:text-gray-600 font-mono text-center">
										{project.title}
									</span>
								</div>
							)}
						</div>

						{/* Content */}
						<div className="p-4 sm:p-6">
							<div className="flex items-center justify-between mb-2">
								<h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
									{project.title}
								</h3>
								<OutlineArrowRight
									size={16}
									className="text-gray-400 dark:text-gray-600 -rotate-45 group-hover:rotate-0 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-all"
								/>
							</div>
							<div className="flex flex-wrap items-center gap-2 mb-4">
								{project.category.map((cat) => (
									<Badge key={cat} variant="secondary">
										{cat}
									</Badge>
								))}
								<div className="flex flex-wrap gap-2 items-center">
									{project.status.map((status: string, index: number) => (
										<Badge key={index} variant={getStatusVariant(status)}>
											{status}
										</Badge>
									))}
								</div>
							</div>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
								{project.description}
							</p>
							<div className="flex flex-wrap gap-2 items-center">
								{project.technologies.slice(0, 3).map((tech: string) => (
									<span
										key={tech}
										className="text-xs font-mono px-2 py-1 bg-muted/50 text-muted-foreground border border-border/50"
									>
										{tech}
									</span>
								))}
								{project.technologies.length > 3 && (
									<span className="text-xs text-muted-foreground">
										+{project.technologies.length - 3}
									</span>
								)}
							</div>
						</div>
					</div>
				) : (
					<div className="p-4 hover:bg-foreground/[0.02] transition-colors focus-within:outline-none focus-within:z-10 focus-visible:bg-foreground/[0.02] focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-ring">
						<div className="flex items-center justify-between mb-2">
							<h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
								{project.title}
							</h3>
							<OutlineArrowRight
								size={16}
								className="text-gray-400 dark:text-gray-600 -rotate-45 group-hover:rotate-0 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-all"
							/>
						</div>
						<div className="flex flex-wrap items-center gap-2 mb-2">
							{project.category.map((cat) => (
								<Badge key={cat} variant="secondary">
									{cat}
								</Badge>
							))}
							<div className="flex flex-wrap gap-2 items-center">
								{project.status.map((status: string, index: number) => (
									<Badge key={index} variant={getStatusVariant(status)}>
										{status}
									</Badge>
								))}
							</div>
						</div>
						<div className="flex items-center gap-2 flex-wrap">
							{project.technologies.slice(0, 3).map((tech: string) => (
								<span
									key={tech}
									className="text-xs font-mono px-2 py-1 bg-muted/50 text-muted-foreground border border-border/50"
								>
									{tech}
								</span>
							))}
							{project.technologies.length > 3 && (
								<span className="text-xs text-muted-foreground">
									+{project.technologies.length - 3}
								</span>
							)}
						</div>
					</div>
				)}
			</Link>
		</div>
	);
}
