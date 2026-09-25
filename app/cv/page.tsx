"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import CVSection from "@/components/sections/CVSection";
import { useLanguage } from "@/app/providers/language-provider";

export default function CvPage() {
	const cvRef = React.useRef<HTMLDivElement | null>(null);
	const { dict, locale } = useLanguage();

	function handleDownloadPdf() {
		// Determine which PDF to download based on current language
		const pdfFileName =
			locale === "pl" ? "KrystianGerman_CV_PL.pdf" : "KrystianGerman_CV_EN.pdf";

		// Create a temporary link element to trigger download
		const link = document.createElement("a");
		link.href = `/${pdfFileName}`;
		link.download = pdfFileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	return (
		<div className="px-4 sm:px-6 lg:px-8 my-8 space-y-4">
			<section>
				<div className="border-l-4 border-black dark:border-white pl-4 mb-2">
					<h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
						{dict.cv.title}
					</h1>
				</div>
			</section>

			<div className="flex items-center justify-end gap-2">
				<Button
					onClick={handleDownloadPdf}
					className="whitespace-nowrap"
					variant="outline"
				>
					{dict.cv.downloadPdf}
				</Button>
			</div>

			<CVSection ref={cvRef} />
		</div>
	);
}
