import Link from "next/link";
import { OutlineArrowRight } from "@/icons/Icons";
import { useLanguage } from "@/app/providers/language-provider";

const socialLinks = [
	{
		platform: "GitHub",
		handle: "gecko-creative",
		href: "https://github.com/gecko-creative",
		icon: "GH",
	},
	{
		platform: "Twitter",
		handle: "@hasiradoo",
		href: "https://twitter.com/hasiradoo",
		icon: "TW",
	},
	{
		platform: "Discord",
		handle: "hasiradoo",
		href: "https://discord.com/users/569975072417251378",
		icon: "DC",
	},
	// { platform: "Patreon", handle: "gecko_creative", href: "https://patreon.com/gecko_creative", icon: "PA" },
	{
		platform: "Bsky",
		handle: "@hasiradoo.rabbittale.co",
		href: "https://bsky.app/profile/hasiradoo.rabbittale.co",
		icon: "BS",
	},
	{
		platform: "Telegram",
		handle: "@hasiradooo",
		href: "https://t.me/hasiradooo",
		icon: "T",
	},
];

export default function ConnectSection() {
	const { dict } = useLanguage();

	return (
		<section id="socials">
			<div className="space-y-3">
				<div className="border-l-4 border-black dark:border-white pl-4">
					<h2 className="text-lg font-mono font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
						{dict.home.connect.title}
					</h2>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						{dict.home.connect.subtitle}
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-px pt-px bg-foreground/[0.02]">
					{socialLinks.map((social, index) => (
						<Link
							key={index}
							href={social.href}
							target={social.href.startsWith("http") ? "_blank" : undefined}
							rel={
								social.href.startsWith("http")
									? "noopener noreferrer"
									: undefined
							}
							className={`group bg-background p-6 hover:bg-foreground/[0.02] focus-visible:outline-none focus-visible:z-10 focus-visible:bg-foreground/[0.02] transition-colors focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-ring ${
								index === socialLinks.length - 1 &&
								socialLinks.length % 2 !== 0 &&
								"sm:col-span-2"
							}`}
						>
							<div className="flex items-center justify-between">
								<div className="space-y-2">
									<div className="flex items-center gap-3">
										<div className="size-8 bg-foreground text-background flex items-center justify-center font-mono text-xs font-bold">
											{social.icon}
										</div>
										<div className="font-mono text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
											{social.platform}
										</div>
									</div>
									<div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
										{social.handle}
									</div>
								</div>
								<div className="opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity">
									<OutlineArrowRight
										size={16}
										className="text-gray-400 group-focus-within:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
									/>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
