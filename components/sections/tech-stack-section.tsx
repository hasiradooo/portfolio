"use client";

import { motion } from "framer-motion";
import { StatsCard } from "../ui/stats-card";

const technologies = [
	{
		category: "Frontend",
		items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
	},
	{
		category: "Backend",
		items: ["Node.js", "Bun", "PostgreSQL", "Supabase", "tRPC"],
	},
	{
		category: "Tools & Others",
		items: ["Git", "Docker", "Figma", "VS Code", "AI/ML"],
	},
];

const generateChartData = (baseValue: number, volatility: number) => {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	return months.map((date) => ({
		date,
		value: Math.max(0, baseValue + Math.random() * volatility - volatility / 2),
	}));
};

const stats = [
	{
		title: "Commits",
		value: "2,547",
		change: 12,
		chart: {
			data: generateChartData(100, 50),
			color: "#22c55e",
		},
		badge: {
			label: "Active",
			variant: "stable" as const,
		},
	},
	{
		title: "Projects",
		value: "50+",
		chart: {
			data: generateChartData(40, 20),
			color: "#3b82f6",
		},
		badge: {
			label: "In Development",
			variant: "development" as const,
		},
	},
	{
		title: "Technologies",
		value: "20+",
		chart: {
			data: generateChartData(20, 5),
			color: "#f59e0b",
		},
	},
];

export default function TechStackSection() {
	return (
		<section className="py-24 pattern-bg bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed">
			<div className="max-w-screen-md mx-auto px-6">
				<div className="space-y-12">
					{/* Stats Cards */}
					<div className="grid gap-6">
						{stats.map((stat) => (
							<StatsCard key={stat.title} orientation="horizontal" {...stat} />
						))}
					</div>

					{/* Tech Stack */}
					<div className="space-y-8">
						<h2 className="text-2xl font-mono font-bold text-gray-900 dark:text-gray-100 text-center">
							Tech Stack
						</h2>
						<div className="grid md:grid-cols-3 gap-8">
							{technologies.map((tech, categoryIndex) => (
								<motion.div
									key={tech.category}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: categoryIndex * 0.1 }}
									viewport={{ once: true }}
									className="space-y-4"
								>
									<h3 className="text-sm font-mono font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
										{tech.category}
									</h3>
									<div className="flex flex-wrap gap-2">
										{tech.items.map((item, itemIndex) => (
											<motion.span
												key={item}
												initial={{ opacity: 0, scale: 0.8 }}
												whileInView={{ opacity: 1, scale: 1 }}
												transition={{
													delay: (categoryIndex * 5 + itemIndex) * 0.05,
												}}
												viewport={{ once: true }}
												className="rounded-none px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-xs font-mono"
											>
												{item}
											</motion.span>
										))}
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
