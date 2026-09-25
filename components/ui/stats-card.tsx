"use client";

import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Area, AreaChart } from "recharts";
import { motion } from "framer-motion";

interface StatsCardProps {
	title: string;
	value: string | number;
	change?: number;
	chart?: {
		data: Array<{ value: number; date: string }>;
		color: string;
	};
	className?: string;
	orientation?: "horizontal" | "vertical";
	badge?: {
		label: string;
		variant?:
			| "default"
			| "secondary"
			| "destructive"
			| "outline"
			| "stable"
			| "beta"
			| "alpha"
			| "development"
			| "concept"
			| "archived";
	};
}

export function StatsCard({
	title,
	value,
	change,
	chart,
	className,
	orientation = "vertical",
	badge,
}: StatsCardProps) {
	const isPositiveChange = change && change > 0;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className={cn(
				"rounded-none border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6",
				orientation === "horizontal" ? "flex items-center gap-6" : "space-y-4",
				className,
			)}
		>
			<div
				className={cn("space-y-2", orientation === "horizontal" && "min-w-48")}
			>
				<div className="flex items-center gap-2">
					<h3 className="text-xs font-mono text-gray-600 dark:text-gray-400 uppercase tracking-wider">
						{title}
					</h3>
					{badge && (
						<Badge variant={badge.variant} className="rounded-none">
							{badge.label}
						</Badge>
					)}
				</div>
				<div className="flex items-baseline gap-2">
					<span className="text-2xl font-mono font-bold text-gray-900 dark:text-gray-100">
						{typeof value === "number" ? value.toLocaleString() : value}
					</span>
					{change && (
						<span
							className={cn(
								"text-xs font-mono",
								isPositiveChange
									? "text-green-600 dark:text-green-400"
									: "text-red-600 dark:text-red-400",
							)}
						>
							{isPositiveChange ? "+" : ""}
							{change}%
						</span>
					)}
				</div>
			</div>

			{chart && (
				<div
					className={cn(
						"h-24",
						orientation === "horizontal" ? "flex-1" : "w-full",
					)}
				>
					<ChartContainer
						config={{
							line: {
								theme: {
									light: chart.color,
									dark: chart.color,
								},
							},
						}}
					>
						<AreaChart
							data={chart.data}
							margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
						>
							<defs>
								<linearGradient
									id={`gradient-${title}`}
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop offset="0%" stopColor={chart.color} stopOpacity={0.2} />
									<stop offset="100%" stopColor={chart.color} stopOpacity={0} />
								</linearGradient>
							</defs>
							<Area
								type="monotone"
								dataKey="value"
								stroke={chart.color}
								strokeWidth={1.5}
								fillOpacity={1}
								fill={`url(#gradient-${title})`}
							/>
							<ChartTooltip
								content={({ active, payload }) => {
									if (!active || !payload?.length) return null;
									return null; // Temporarily disable tooltip content
								}}
							/>
						</AreaChart>
					</ChartContainer>
				</div>
			)}
		</motion.div>
	);
}
