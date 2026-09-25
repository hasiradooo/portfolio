import React from "react";

interface SectionProps {
	id: string;
	title?: string;
	description?: string;
	children?: React.ReactNode;
}

export function Section({ id, title, description, children }: SectionProps) {
	return (
		<section id={id}>
			{title && (
				<div className="border-l-4 border-black dark:border-white pl-4 mb-6">
					<h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2">
						{title}
					</h2>
					{description && (
						<p className="text-sm text-gray-600 dark:text-gray-400">
							{description}
						</p>
					)}
				</div>
			)}
			{children}
		</section>
	);
}
