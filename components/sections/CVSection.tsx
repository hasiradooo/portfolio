"use client";

import React from "react";
import { useLanguage } from "@/app/providers/language-provider";

const CVSection = React.forwardRef<HTMLDivElement>(
	function CVSection(props, ref) {
		const { dict } = useLanguage();
		const t = dict.cv.content;

		return (
			<div
				ref={ref}
				className="mx-auto bg-background text-gray-900 border border-border overflow-hidden"
				style={{ maxWidth: 900 }}
			>
				{/* Header */}
				<div className="p-6 border-b border-border">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
						<div>
							<h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
								{t.name}
							</h2>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								{t.tagline}
							</p>
						</div>
						<div className="text-sm text-gray-700 dark:text-gray-300 space-y-0.5">
							<p>
								{t.contact.labels.email}{" "}
								<span className="text-muted-foreground">{t.contact.email}</span>
							</p>
							{/* <p>{t.contact.labels.phone} <span className="text-muted-foreground">{t.contact.phone}</span></p> */}
							<p>
								{t.contact.labels.website}{" "}
								<span className="text-muted-foreground">
									{t.contact.website}
								</span>
							</p>
							<p>
								{t.contact.labels.location}{" "}
								<span className="text-muted-foreground">
									{t.contact.location}
								</span>
							</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-0">
					{/* Sidebar */}
					<aside className="md:col-span-1 py-6 space-y-6 border-b md:border-b-0 md:border-r border-border">
						<section>
							<div className="border-l-4 border-black dark:border-white pl-4 mb-2">
								<h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
									{t.headings.skills}
								</h3>
							</div>
							<div className="px-4">
								<ul className="space-y-1.5">
									{t.skills.map((skill) => (
										<li
											key={skill}
											className="flex items-start gap-2 relative pl-6"
										>
											<span className="absolute left-0 top-2.5 size-1.5 bg-foreground" />
											<span className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
												{skill}
											</span>
										</li>
									))}
								</ul>
							</div>
						</section>

						<section>
							<div className="border-l-4 border-black dark:border-white pl-4 mb-2">
								<h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
									{t.headings.tools}
								</h3>
							</div>
							<div className="px-4">
								<ul className="space-y-1.5">
									{t.tools.map((tool) => (
										<li
											key={tool}
											className="flex items-start gap-2 relative pl-6"
										>
											<span className="absolute left-0 top-2.5 size-1.5 bg-foreground" />
											<span className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
												{tool}
											</span>
										</li>
									))}
								</ul>
							</div>
						</section>

						<section>
							<div className="border-l-4 border-black dark:border-white pl-4 mb-2">
								<h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
									{t.headings.languages}
								</h3>
							</div>
							<div className="px-4 text-sm space-y-1.5">
								{t.languages.map((lang, idx) => (
									<div key={idx} className="flex justify-between">
										<span className="text-gray-900 dark:text-gray-100">
											{lang.language}
										</span>
										<span className="text-gray-600 dark:text-gray-400">
											{lang.level}
										</span>
									</div>
								))}
							</div>
						</section>

						<section>
							<div className="border-l-4 border-black dark:border-white pl-4 mb-2">
								<h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
									{t.headings.education}
								</h3>
							</div>
							<div className="px-4 text-sm space-y-2 flex-1">
								{/* Render multiple education entries */}
								{t.education.map((edu, idx) => (
									<div key={idx}>
										<p className="font-semibold text-gray-900 dark:text-gray-100">
											{edu.degree}
										</p>
										<p className="text-gray-600 dark:text-gray-400">
											{edu.school} ({edu.period})
										</p>
									</div>
								))}
							</div>
						</section>
					</aside>

					{/* Main */}
					<main className="md:col-span-2 py-6 space-y-6">
						<section>
							<div className="border-l-4 border-black dark:border-white pl-4 mb-2">
								<h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
									{t.headings.experience}
								</h3>
							</div>
							<div className="px-4 space-y-4">
								{t.experience.map((job, idx) => (
									<div key={idx}>
										<div className="flex items-baseline justify-between gap-4">
											<p className="font-semibold text-gray-900 dark:text-gray-100">
												{job.roleCompany}
											</p>
											<p className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap shrink-0">
												{job.period}
											</p>
										</div>
										{"location" in job && job.location && (
											<p className="text-sm text-gray-600 dark:text-gray-400">
												{job.location}
											</p>
										)}
										<ul className="mt-2 space-y-1.5">
											{job.bullets.map((it, bIdx) => (
												<li
													key={bIdx}
													className="flex items-start gap-2 relative pl-6"
												>
													<span className="absolute left-0 top-2.5 size-1.5 bg-foreground" />
													<span className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
														{it}
													</span>
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</section>

						<section>
							<div className="border-l-4 border-black dark:border-white pl-4 mb-2">
								<h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
									{t.headings.summary}
								</h3>
							</div>
							<div className="px-4">
								<p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
									{t.summary}
								</p>
							</div>
						</section>
					</main>
				</div>

				{/* GDPR Consent Footer */}
				<div className="px-6 py-4 border-t border-border">
					<p className="text-xs text-gray-500 dark:text-gray-500 text-center">
						{t.gdprConsent}
					</p>
				</div>
			</div>
		);
	},
);

export default CVSection;
