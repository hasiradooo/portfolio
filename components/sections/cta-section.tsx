import Link from "next/link";
import { Button } from "../ui/button";
import { useLanguage } from "@/app/providers/language-provider";

export default function CTASection() {
	const { dict } = useLanguage();

	return (
		<section id="cta">
			<div className="p-6 text-center">
				<div className="space-y-8">
					<div className="space-y-4">
						<h2 className="text-xl font-mono font-bold text-foreground uppercase tracking-wider">
							{dict.home.cta.title}
						</h2>
						<p className="text-foreground/60 max-w-md mx-auto">
							{dict.home.cta.subtitle}
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-px bg-foreground/[0.02] max-w-md mx-auto">
						<Button asChild size={"xl"} className="w-full sm:w-auto sm:flex-1">
							<Link href="/contact">{dict.home.cta.button}</Link>
						</Button>
						<Button
							asChild
							size={"xl"}
							variant={"outline"}
							className="w-full sm:w-auto sm:flex-1"
						>
							<Link href="/projects">{dict.common.nav.projects}</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
