import React from "react";

interface ArticleProps {
	title?: string;
	className?: string;
	children: React.ReactNode;
	bgColor?: string;
}

export function ContentArticle({
	title,
	className = "",
	children,
	bgColor = "bg-background",
}: ArticleProps) {
	return (
		<div className={`${bgColor} first:pt-0 p-4 sm:p-6 ${className}`}>
			{title && (
				<h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
					{title}
				</h3>
			)}
			{children}
		</div>
	);
}
