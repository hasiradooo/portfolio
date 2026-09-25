"use client";

import { SectionSeparator } from "@/components/sections/SectionSeparator";
import { OutlineArrowRight } from "@/icons/Icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/app/providers/language-provider";
import { ToSArticle } from "@/components/sections/TosArticle";
import { Section } from "@/components/section";
import { ContentArticle } from "@/components/content-article";

export default function PricesPage() {
	const { dict } = useLanguage();

	return (
		<div className="[&>section:not(#hero)]:pt-6 [&>section:is(:last-child)]:pb-6">
			{/* Header */}
			<Section
				id="prices-header"
				title={dict?.prices?.title}
				description={dict?.prices?.description}
			>
				{/* Header content */}
			</Section>

			<SectionSeparator />

			{/* Pricing Packages */}
			<Section id="pricing-packages" title={dict?.prices?.packages?.title}>
				<div className="space-y-px">
					{/* Basic Package */}
					<PricePackage
						title={dict?.prices?.packages?.basic?.title}
						price={dict?.prices?.packages?.basic?.price}
						originalPrice={dict?.prices?.packages?.basic?.originalPrice}
						description={dict?.prices?.packages?.basic?.description}
						features={dict?.prices?.packages?.basic?.features}
					/>

					{/* Professional Package */}
					<PricePackage
						title={dict?.prices?.packages?.professional?.title}
						price={dict?.prices?.packages?.professional?.price}
						description={dict?.prices?.packages?.professional?.description}
						features={dict?.prices?.packages?.professional?.features}
						highlighted={true}
					/>

					{/* Enterprise Package */}
					<PricePackage
						title={dict?.prices?.packages?.enterprise?.title}
						price={dict?.prices?.packages?.enterprise?.price}
						description={dict?.prices?.packages?.enterprise?.description}
						features={dict?.prices?.packages?.enterprise?.features}
					/>
				</div>
			</Section>

			<SectionSeparator />

			{/* Custom Services */}
			<Section id="custom-services" title={dict?.prices?.customServices?.title}>
				<div className="space-y-px bg-gray-200 dark:bg-background">
					<ContentArticle
						title={dict?.prices?.customServices?.webDevelopment?.title}
					>
						<div className="space-y-2">
							<ul className="space-y-4 sm:space-y-2.5">
								{dict.prices.customServices.webDevelopment.services.map(
									(
										item: {
											name: string;
											price: string;
											originalPrice?: string;
										},
										index,
									) => (
										<PriceItem
											key={index}
											service={item.name}
											price={item.price}
											originalPrice={item.originalPrice}
										/>
									),
								)}
							</ul>
						</div>
					</ContentArticle>

					<ContentArticle
						title={dict?.prices?.customServices?.uiUxDesign?.title}
					>
						<div className="space-y-2">
							<ul className="space-y-4 sm:space-y-2.5">
								{dict.prices.customServices.uiUxDesign.services.map(
									(item, index) => (
										<PriceItem
											key={index}
											service={item.name}
											price={item.price}
											originalPrice={item.originalPrice}
										/>
									),
								)}
							</ul>
						</div>
					</ContentArticle>

					<ContentArticle
						title={dict?.prices?.customServices?.portfolioWebsites?.title}
					>
						<div className="space-y-2">
							<ul className="space-y-4 sm:space-y-2.5">
								{dict.prices.customServices.portfolioWebsites.services.map(
									(
										item: {
											name: string;
											price: string;
											originalPrice?: string;
										},
										index,
									) => (
										<PriceItem
											key={index}
											service={item.name}
											price={item.price}
											originalPrice={item.originalPrice}
										/>
									),
								)}
							</ul>
						</div>
					</ContentArticle>
				</div>
			</Section>

			<SectionSeparator />

			{/* FAQ Section */}
			<Section id="faq" title={dict?.prices?.faq?.title}>
				<div className="space-y-px bg-gray-200 dark:bg-background">
					{dict.prices.faq.items.map((item, index) => (
						<FaqItem
							key={index}
							question={item.question}
							answer={item.answer}
						/>
					))}
				</div>
			</Section>

			<SectionSeparator />

			{/* Terms of Service */}
			<Section
				id="terms-of-service"
				title={dict?.prices?.termsOfService?.title || "Terms of Service"}
			>
				<div className="space-y-px bg-gray-200 dark:bg-background">
					{/* Payment Terms */}
					<ToSArticle
						title={dict?.prices?.termsOfService?.sections?.paymentTerms?.title}
						items={dict?.prices?.termsOfService?.sections?.paymentTerms?.items}
						className="first:pt-0"
					/>

					{/* Scope, Revisions & Change Requests */}
					<ToSArticle
						title={dict?.prices?.termsOfService?.sections?.scope?.title}
						items={dict?.prices?.termsOfService?.sections?.scope?.items}
					/>

					{/* Project Timeline & Client Responsibilities */}
					<ToSArticle
						title={dict?.prices?.termsOfService?.sections?.timeline?.title}
						items={dict?.prices?.termsOfService?.sections?.timeline?.items}
					/>

					{/* Ownership, Portfolio & Attribution */}
					<ToSArticle
						title={dict?.prices?.termsOfService?.sections?.ownership?.title}
						items={dict?.prices?.termsOfService?.sections?.ownership?.items}
					/>

					{/* Technical Standards & Third‑Party Services */}
					<ToSArticle
						title={dict?.prices?.termsOfService?.sections?.technical?.title}
						items={dict?.prices?.termsOfService?.sections?.technical?.items}
					/>

					{/* Warranty, Maintenance & Support */}
					<ToSArticle
						title={dict?.prices?.termsOfService?.sections?.warranty?.title}
						items={dict?.prices?.termsOfService?.sections?.warranty?.items}
					/>

					{/* Cancellation & Termination */}
					<ToSArticle
						title={dict?.prices?.termsOfService?.sections?.cancellation?.title}
						items={dict?.prices?.termsOfService?.sections?.cancellation?.items}
					/>

					{/* Liability & Force Majeure */}
					<ToSArticle
						title={dict?.prices?.termsOfService?.sections?.liability?.title}
						items={dict?.prices?.termsOfService?.sections?.liability?.items}
					/>

					{/* "Unlimited" Pages Clarification */}
					<div className="bg-background p-4 sm:p-6">
						<h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">
							{dict?.prices?.termsOfService?.sections?.unlimitedPages?.title}
						</h3>
						<p className="text-sm text-gray-700 dark:text-gray-300">
							{
								dict?.prices?.termsOfService?.sections?.unlimitedPages
									?.description
							}
						</p>
					</div>
				</div>
			</Section>
		</div>
	);
}

function PricePackage({
	title,
	price,
	description,
	features,
	highlighted = false,
	originalPrice,
}: {
	title: string;
	price: string;
	description: string;
	features: string[];
	highlighted?: boolean;
	originalPrice?: string;
}) {
	const { dict } = useLanguage();

	return (
		<div
			className={`bg-background first:pt-0 p-4 sm:p-6 ${highlighted ? "bg-foreground/[0.02] dark:border-l-4 dark:border-white" : ""}`}
		>
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-4">
				<div>
					<h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
						{title}
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						{description}
					</p>
				</div>
				<div className="text-left sm:text-right mt-2 sm:mt-0">
					{originalPrice && (
						<span className="text-sm font-mono text-gray-500 line-through block">
							{originalPrice}
						</span>
					)}
					<div className="text-xl font-bold text-gray-900 dark:text-gray-100">
						{price}
					</div>
				</div>
			</div>

			<ul className="space-y-2 mb-6">
				{features.map((feature, index) => (
					<li
						key={index}
						className="flex items-start gap-3 sm:gap-2.5 text-sm relative pl-6"
					>
						<span className="absolute left-0 top-2.5 size-1.5 bg-foreground flex-shrink-0" />
						<span className="leading-relaxed">{feature}</span>
					</li>
				))}
			</ul>

			<Button asChild className="group w-full sm:w-auto">
				<Link
					href="/contact"
					className="flex items-center justify-center gap-2"
				>
					{dict?.prices?.packages?.ctaButton || "Get Started"}
					<OutlineArrowRight
						size={16}
						className="group-hover:translate-x-1 transition-transform"
					/>
				</Link>
			</Button>
		</div>
	);
}

function PriceItem({
	service,
	price,
	originalPrice,
}: {
	service: string;
	price: string;
	originalPrice?: string;
}) {
	return (
		<li className="flex items-start gap-3 sm:gap-2.5 text-sm relative pl-6">
			<span className="absolute left-0 top-2.5 size-1.5 bg-foreground flex-shrink-0" />
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
				<span className="leading-relaxed mb-1 sm:mb-0">{service}</span>
				<div className="text-left sm:text-right">
					{originalPrice && (
						<span className="text-sm font-mono text-gray-500 line-through sm:mr-2 block sm:inline">
							{originalPrice}
						</span>
					)}
					<span className="text-sm font-mono font-bold">{price}</span>
				</div>
			</div>
		</li>
	);
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
	return (
		<div className="bg-background first:pt-0 p-4 sm:p-6">
			<h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">
				{question}
			</h3>
			<p className="text-sm text-gray-700 dark:text-gray-300">{answer}</p>
		</div>
	);
}
