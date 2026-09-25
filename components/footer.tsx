"use client";

import Link from "next/link";
import { OutlineArrowRight, SolidLogo } from "@/icons/Icons";
import { SectionSeparator } from "./sections/SectionSeparator";
import { useLanguage } from "@/app/providers/language-provider";
import { SolidLogoTextGecko } from "@/icons/assets/logo/logo_text_gecko";

export default function Footer() {
	const { dict } = useLanguage();
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{
			label: dict.footer.socialLinks.github,
			href: "https://github.com/gecko-creative",
			icon: "GH",
		},
		{
			label: dict.footer.socialLinks.twitter,
			href: "https://twitter.com/hasiradoo",
			icon: "TW",
		},
		{
			label: dict.footer.socialLinks.bsky,
			href: "https://bsky.app/profile/hasiradoo.rabbittale.co",
			icon: "BS",
		},
		{
			label: dict.footer.socialLinks.patreon,
			href: "https://patreon.com/gecko_creative",
			icon: "PA",
		},
		{
			label: dict.footer.socialLinks.discord,
			href: "https://discord.com/users/569975072417251378",
			icon: "DC",
		},
		{
			label: dict.footer.socialLinks.telegram,
			href: "https://t.me/hasiradooo",
			icon: "TG",
		},
	];

	const navigationLinks = [
		{ label: dict.common.nav.personal, href: "/" },
		{ label: dict.footer.navigationLinks.home, href: "/" },
		{ label: dict.footer.navigationLinks.about, href: "/about" },
		{ label: dict.footer.navigationLinks.projects, href: "/projects" },
		{ label: dict.footer.navigationLinks.patrons, href: "/patrons" },
		{ label: dict.footer.navigationLinks.contact, href: "/contact" },
	];

	const resourceLinks = [
		{
			label: dict.footer.resourceLinks.gameStudio,
			href: "https://gecko-creative.games",
		},
		// { label: dict.footer.resourceLinks.blog, href: "https://blog.rabbittale.co" },
		{
			label: dict.footer.resourceLinks.sourceCode,
			href: "https://github.com/gecko-creative/portfolio",
		},
	];

	const LinkWithArrow = ({
		href,
		label,
		isExternal = false,
	}: {
		href: string;
		label: string;
		icon?: string;
		isExternal?: boolean;
	}) => (
		<Link
			href={href}
			target={isExternal ? "_blank" : undefined}
			rel={isExternal ? "noopener noreferrer" : undefined}
			className="flex items-center gap-3 text-xs font-mono text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors uppercase tracking-wider group focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-offset-2 focus-visible:ring-ring"
		>
			{/* {icon && (
        <div className="size-6 bg-foreground/[0.02] flex items-center justify-center text-xs font-bold">
          {icon}
        </div>
      )} */}
			{label}
			<OutlineArrowRight
				size={12}
				className="opacity-0 -translate-x-2 -rotate-45
          group-hover:opacity-100 group-hover:translate-x-0 group-hover:rotate-0
          transition-all duration-150 group-focus-within:opacity-100 group-focus-within:translate-x-0 group-focus-within:rotate-0"
			/>
		</Link>
	);

	return (
		<footer className="border-t border-border">
			<div className="max-w-screen-md mx-auto sm:border-l sm:border-r border-border">
				<div className="bg-foreground/[0.02]">
					{/* Main Footer Content */}
					<div className="bg-background p-6">
						<div className="flex flex-col md:flex-row justify-between items-start gap-8">
							{/* Logo and info */}
							<div className="w-full md:w-auto space-y-4">
								<div className="flex items-center gap-3">
									<SolidLogoTextGecko size={64} />
									<span className="font-mono font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wider">
										{dict.footer.personalInfo.name}
									</span>
								</div>
								<div className="space-y-2">
									<p className="text-xs font-mono text-gray-600 dark:text-gray-400 uppercase tracking-wider">
										{dict.footer.personalInfo.role}
									</p>
									<p className="text-xs font-mono text-gray-500 dark:text-gray-500">
										{dict.footer.personalInfo.since}
									</p>
								</div>
							</div>

							{/* Links */}
							<div className="w-full md:w-auto grid grid-cols-1 md:flex md:gap-8 gap-8">
								{/* Social Links */}
								<div className="space-y-4">
									<div className="border-l-4 border-black dark:border-white pl-4">
										<h4 className="text-xs font-mono font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
											{dict.footer.sections.socials}
										</h4>
									</div>
									<div className="space-y-2">
										{socialLinks.map((link) => (
											<LinkWithArrow
												key={link.label}
												href={link.href}
												label={link.label}
												icon={link.icon}
												isExternal={link.href.startsWith("http")}
											/>
										))}
									</div>
								</div>

								{/* Navigation Links */}
								<div className="space-y-4">
									<div className="border-l-4 border-black dark:border-white pl-4">
										<h4 className="text-xs font-mono font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
											{dict.footer.sections.navigation}
										</h4>
									</div>
									<div className="space-y-2">
										{navigationLinks.map((link) => (
											<LinkWithArrow
												key={link.label}
												href={link.href}
												label={link.label}
											/>
										))}
									</div>
								</div>

								{/* Resources */}
								<div className="space-y-4">
									<div className="border-l-4 border-black dark:border-white pl-4">
										<h4 className="text-xs font-mono font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
											{dict.footer.sections.resources}
										</h4>
									</div>
									<div className="space-y-2">
										{resourceLinks.map((link) => (
											<LinkWithArrow
												key={link.label}
												href={link.href}
												label={link.label}
												isExternal
											/>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					<SectionSeparator />

					<div className="bg-background p-6">
						<div className="flex flex-col sm:flex-row justify-between items-center gap-4">
							<p className="text-xs font-mono text-gray-500 dark:text-gray-500 uppercase tracking-wider">
								&copy; {currentYear} {dict.footer.copyright.allRightsReserved}
							</p>
							<p className="text-xs font-mono text-gray-500 dark:text-gray-500 uppercase tracking-wider">
								{dict.footer.copyright.madeBy}
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
