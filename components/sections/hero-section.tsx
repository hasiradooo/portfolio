"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FlipWords } from "../ui/flip-words";
import { Button } from "../ui/button";
import { useLanguage } from "@/app/providers/language-provider";

export default function HeroSection() {
	const { dict } = useLanguage();

	return (
		<section className="min-h-[75vh] relative flex items-center justify-center overflow-hidden">
			{/* Content */}
			<div className="relative max-w-screen-md mx-auto px-6 py-24">
				<div className="space-y-8">
					{/* Main Title */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="space-y-4"
					>
						<h1 className="text-4xl md:text-6xl font-mono font-bold text-foreground">
							{dict.home.hero.greeting}
						</h1>

						<FlipWords
							words={dict.home.hero.roles}
							className="text-xl md:text-2xl font-mono text-foreground/60"
						/>
					</motion.div>

					{/* Description */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-lg text-foreground/60 max-w-2xl"
					>
						{dict.home.hero.description}
					</motion.p>

					{/* CTA Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="flex flex-wrap gap-4"
					>
						<Button asChild size={"xl"} variant={"outline"}>
							<Link href="/cv">{dict.common.nav.cv}</Link>
						</Button>

						<Button asChild size={"xl"}>
							<Link href="/contact">{dict.common.nav.contact}</Link>
						</Button>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
