import { calculateAge, calculateExperience } from "@/lib/utils";

export default function AboutSection() {
	const age = calculateAge("2001-07-11"); // Kris's birthday
	const experience = calculateExperience(2016);

	return (
		<section id="about">
			<div className="space-y-3">
				<div className="border-l-4 border-border pl-4 mb-3">
					<h2 className="text-lg font-mono font-bold text-foreground uppercase tracking-wider">
						About Me
					</h2>
				</div>

				<div className="prose prose-foreground p-6">
					<p className="text-foreground/60 leading-relaxed">
						I&apos;m a passionate {age}-year-old designer and developer from
						Poland with {experience}+ years of experience creating beautiful
						digital experiences. My journey started in 2016 with design
						fundamentals, and I&apos;ve since evolved into building everything
						from mobile games to AI-powered tools.
					</p>
					<p className="text-foreground/60 leading-relaxed">
						Currently focused on game development with projects like TinyBuddies
						and SoundLess, while also working on innovative Minecraft mods and
						developer tools. I believe in creating technology that brings joy
						and solves real problems.
					</p>
				</div>
			</div>
		</section>
	);
}
