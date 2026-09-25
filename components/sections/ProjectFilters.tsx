import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useLanguage } from "@/app/providers/language-provider";

interface ProjectFiltersProps {
	activeFilter: string | "all";
	onFilterChange: (filter: string | "all") => void;
}

export function ProjectFilters({
	activeFilter,
	onFilterChange,
}: ProjectFiltersProps) {
	const { dict } = useLanguage();

	const filters = [
		{ id: "all", label: dict.projects.filters.all },
		{ id: "games", label: dict.projects.filters.games },
		{ id: "webApps", label: dict.projects.filters.webApps },
		{ id: "desktop", label: dict.projects.filters.desktop },
		{ id: "mobile", label: dict.projects.filters.mobile },
		{ id: "websites", label: dict.projects.filters.websites },
		{ id: "mods", label: dict.projects.filters.mods },
	];

	return (
		<div className="sticky top-[57px] z-40 bg-background/90 backdrop-blur-md border-b border-border">
			<ScrollArea orientation="horizontal" className="w-full">
				<div className="flex">
					{filters.map((filter) => (
						<Button
							key={filter.id}
							onClick={() => onFilterChange(filter.id)}
							size={"lg"}
							variant={activeFilter === filter.id ? "default" : "ghost"}
							className="shrink-0 focus-visible:z-10"
						>
							{filter.label}
						</Button>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
