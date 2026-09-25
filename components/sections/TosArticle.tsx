import React from "react";

type TermsOfServiceSectionProps = {
	title: string | undefined;
	items: string[] | undefined;
	className?: string;
};

export function ToSArticle({
	title,
	items,
	className = "",
}: TermsOfServiceSectionProps) {
	return (
		<article className={`bg-background p-4 sm:p-6 ${className}`}>
			<h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">
				{title}
			</h3>
			<ul className="space-y-2">
				{items?.map((item, index) => (
					<li
						key={index}
						className="flex items-start gap-3 sm:gap-2.5 text-sm relative pl-6"
					>
						<span className="absolute left-0 top-2.5 size-1.5 bg-foreground flex-shrink-0" />
						<span className="leading-relaxed text-gray-700 dark:text-gray-300">
							{item}
						</span>
					</li>
				))}
			</ul>
		</article>
	);
}
