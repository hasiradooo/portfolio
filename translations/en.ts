import zaczkie_large from "@/public/projects/zaczkie-large.png";
import jarvvitch_large from "@/public/projects/Jarvvitch-large.png";
import soundless_small from "@/public/projects/soundless-square.webp";
import soundless_large from "@/public/projects/soundless-large.webp";

export type ProjectStatus =
	| "inDevelopment"
	| "completed"
	| "archived"
	| "concept"
	| "onHold";
export type ProjectCategory =
	| "games"
	| "webApps"
	| "desktop"
	| "mobile"
	| "websites"
	| "mods";

// Define the dictionary type
export interface TranslationDictionary {
	common: {
		nav: {
			personal: string;
			home: string;
			about: string;
			cv: string;
			experience: string;
			projects: string;
			patrons: string;
			prices: string;
			contact: string;
			backToProjects: string;
			skipNavigation: string;
		};
		siteName: string;
		readyToGetStarted: {
			title: string;
			description: string;
			button: string;
		};
	};
	prices: {
		title: string;
		description: string;
		packages: {
			title: string;
			ctaButton: string;
			basic: {
				title: string;
				price: string;
				originalPrice: string;
				description: string;
				features: string[];
			};
			professional: {
				title: string;
				price: string;
				description: string;
				features: string[];
			};
			enterprise: {
				title: string;
				price: string;
				description: string;
				features: string[];
			};
		};
		customServices: {
			title: string;
			webDevelopment: {
				title: string;
				services: Array<{
					name: string;
					price: string;
					originalPrice?: string;
				}>;
			};
			uiUxDesign: {
				title: string;
				services: Array<{
					name: string;
					price: string;
					originalPrice?: string;
				}>;
			};
			portfolioWebsites: {
				title: string;
				services: Array<{
					name: string;
					price: string;
					originalPrice?: string;
				}>;
			};
		};
		faq: {
			title: string;
			items: Array<{
				question: string;
				answer: string;
			}>;
		};
		termsOfService: {
			title: string;
			sections: {
				paymentTerms: {
					title: string;
					items: string[];
				};
				scope: {
					title: string;
					items: string[];
				};
				timeline: {
					title: string;
					items: string[];
				};
				ownership: {
					title: string;
					items: string[];
				};
				technical: {
					title: string;
					items: string[];
				};
				warranty: {
					title: string;
					items: string[];
				};
				cancellation: {
					title: string;
					items: string[];
				};
				liability: {
					title: string;
					items: string[];
				};
				unlimitedPages: {
					title: string;
					description: string;
				};
			};
		};
		cta: {
			title: string;
			description: string;
			buttonText: string;
		};
	};
	projects: {
		title: string;
		noProjectsFound: string;
		filters: {
			all: string;
		} & Record<ProjectCategory, string>;
		categories: Record<ProjectCategory, string>;
		status: Record<ProjectStatus, string>;
		sections: {
			about: string;
			features: string;
			development: string;
			details: string;
			category: string;
			statusLabel: string;
			role: string;
			timeline: string;
			platform: string;
			technologies: string;
			relatedLinks: string;
		};
		cta: {
			title: string;
			description: string;
			patreon: string;
			githubSponsors: string;
		};
		data: Array<{
			slug: string;
			title: string;
			description: string;
			category: ProjectCategory[];
			status: ProjectStatus[];
			technologies: string[];
			links?: Array<{
				name: string;
				url: string;
				description: string;
			}>;
			thumbnail?: {
				square: {
					src: string;
					alt: string;
					blur: string;
				};
				large: {
					src: string;
					alt: string;
					blur: string;
				};
			};
			content: {
				about: string[];
				features: string[];
				development?: string;
			};
			details: {
				role: string;
				timeline: string;
				platform: string;
			};
		}>;
	};
	footer: {
		personalInfo: {
			name: string;
			role: string;
			since: string;
		};
		sections: {
			socials: string;
			navigation: string;
			resources: string;
		};
		socialLinks: {
			github: string;
			twitter: string;
			bsky: string;
			patreon: string;
			discord: string;
			telegram: string;
		};
		navigationLinks: {
			home: string;
			about: string;
			projects: string;
			experience: string;
			patrons: string;
			contact: string;
		};
		resourceLinks: {
			gameStudio: string;
			blog: string;
			sourceCode: string;
		};
		copyright: {
			allRightsReserved: string;
			madeBy: string;
		};
	};
	contact: {
		title: string;
		description: string;
		header: {
			title: string;
			description: string;
		};
		form: {
			title: string;
			sending: string;
			successMessage: string;
			errorMessage: string;
			submit: string;
			recaptchaNotice: string;
			privacyPolicy: string;
			termsOfService: string;
			and: string;
			apply: string;
			fields: {
				name: string;
				namePlaceholder: string;
				email: string;
				emailPlaceholder: string;
				message: string;
				messagePlaceholder: string;
			};
		};
		otherWays: {
			title: string;
			email: {
				title: string;
				value: string;
				description: string;
			};
			discord: {
				title: string;
				value: string;
				description: string;
			};
			telegram: {
				title: string;
				value: string;
				description: string;
			};
			twitter: {
				title: string;
				value: string;
				description: string;
			};
			bsky: {
				title: string;
				value: string;
				description: string;
			};
		};
		availability: {
			title: string;
			description: string;
		};
	};
	about: {
		title: string;
		name: string;
		role: string;
		bio: {
			intro: string;
			projects: string;
		};
		experience: {
			label: string;
			years: string;
			since: string;
		};
		skills: {
			title: string;
			design: {
				title: string;
				items: string[];
			};
			development: {
				title: string;
				items: string[];
			};
			tools: {
				title: string;
				items: string[];
			};
		};
	};
	home: {
		hero: {
			greeting: string;
			roles: string[];
			description: string;
		};
		experience: {
			title: string;
			subtitle: string;
			projectsLabel: string;
			achievementsLabel: string;
			viewProject: string;
			showDetails: string;
			viewFullExperience: string;
		};
		featuredProjects: {
			title: string;
			subtitle: string;
		};
		honorsAwards: {
			title: string;
			subtitle: string;
		};
		connect: {
			title: string;
			subtitle: string;
		};
		cta: {
			title: string;
			subtitle: string;
			button: string;
		};
	};
	cv: {
		title: string;
		tip: string;
		downloadPng: string;
		downloadPdf: string;
		exporting: string;
		fileName: {
			png: string;
			pdf: string;
		};
		content: {
			name: string;
			tagline: string;
			contact: {
				email: string;
				phone: string;
				location: string;
				website: string;
				labels: {
					email: string;
					phone: string;
					location: string;
					website: string;
				};
			};
			headings: {
				skills: string;
				tools: string;
				education: string;
				languages: string;
				summary: string;
				experience: string;
				projects: string;
			};
			skills: string[];
			tools: string[];
			languages: Array<{
				language: string;
				level: string;
			}>;
			education: Array<{
				degree: string;
				school: string;
				period: string;
			}>;
			summary: string;
			experience: Array<{
				roleCompany: string;
				period: string;
				location: string;
				bullets: string[];
			}>;
			gdprConsent: string;
		};
	};
	experience: {
		title: string;
		subtitle: string;
		dateFormats: {
			short: string;
			medium: string;
			long: string;
		};
		data: Array<{
			company: string;
			position: string;
			type: string;
			startDate: string;
			endDate: string;
			description: string;
			achievements: string[];
			tags: string[];
			projects?: Array<{
				name: string;
				description: string;
				link: string;
			}>;
		}>;
	};
	patrons: {
		title: string;
		description: string;
		githubSponsors: {
			title: string;
			description: string;
			becomeASponsor: string;
			noSponsors: string;
			loading: string;
			emptyTitle: string;
			emptyDescription: string;
		};
		patreonSupporters: {
			title: string;
			description: string;
			becomeAPatron: string;
			becomeASupporter: string;
			noPatrons: string;
			noSupporters: string;
			loading: string;
			emptyTitle: string;
			emptyDescription: string;
		};
		common: {
			perMonth: string;
			supportingSince: string;
			oneTime: string;
			custom: string;
			showMore: string;
			showLess: string;
			itemsPerPage: string;
			filterBy: string;
			sortBy: string;
			allTiers: string;
			amount: string;
			date: string;
			name: string;
			highToLow: string;
			lowToHigh: string;
			newest: string;
			oldest: string;
		};
		cta: {
			title: string;
			description: string;
			githubSponsors: string;
			patreon: string;
		};
	};
}

// Remove duplicate declaration and use actual values instead of type references
export const dict: TranslationDictionary = {
	common: {
		nav: {
			personal: "Personal",
			home: "Home",
			about: "About",
			cv: "My CV",
			experience: "Experience",
			projects: "Projects",
			patrons: "Patrons",
			prices: "Prices",
			contact: "Contact",
			backToProjects: "Back to Projects",
			skipNavigation: "Skip Navigation",
		},
		siteName: "Kris German",
		readyToGetStarted: {
			title: "Ready to Get Started?",
			description:
				"Let's discuss your project and create something amazing together.",
			button: "Contact Me",
		},
	},
	prices: {
		title: "Pricing",
		description:
			"I offer transparent pricing options tailored to your needs. Whether you're a small business just starting out or an established enterprise looking for comprehensive solutions, I have packages designed to help you succeed.",
		packages: {
			title: "Pricing Packages",
			ctaButton: "Get Started",
			basic: {
				title: "Basic Package",
				price: "$349",
				originalPrice: "$399",
				description: "Great for small businesses needing a clean, simple site",
				features: [
					"Responsive design",
					"Up to 5 pages",
					"Basic SEO setup",
					"Contact form",
					"1 month of support",
					"Delivery in 2-3 weeks",
				],
			},
			professional: {
				title: "Professional Package",
				price: "$549",
				description: "Ideal for growing businesses with specific needs",
				features: [
					"Everything in Basic",
					"One-page (hero + 5–7 sections) or up to ~8–10 pages",
					"Advanced SEO optimization",
					"Blog integration (Basic CMS)",
					"3 months of support",
					"2 rounds of revisions",
					"Delivery in 3-4 weeks",
				],
			},
			enterprise: {
				title: "Enterprise Package",
				price: "from $899",
				description: "Complete solution for established businesses",
				features: [
					"Everything in Professional",
					"Unlimited pages",
					"E-commerce functionality",
					"Custom animations",
					"Performance optimization",
					"6 months of support",
					"Unlimited revisions",
					"Priority support",
					"Delivery in 5-6 weeks",
				],
			},
		},
		customServices: {
			title: "Custom Services",
			webDevelopment: {
				title: "Web Development",
				services: [
					{ name: "Custom Feature Development", price: "$30/hour" },
					{ name: "Bug Fixes", price: "$22/hour" },
					{ name: "Performance Optimization", price: "$35/hour" },
					{ name: "API Integration", price: "$40/hour" },
				],
			},
			uiUxDesign: {
				title: "UI/UX Design Services",
				services: [
					{ name: "Web UI/UX Design", price: "$20/hour" },
					{ name: "Mobile UI/UX Design", price: "$30/hour" },
					{ name: "Responsive Design Systems", price: "$35/hour" },
					{
						name: "UI Component Library",
						price: "$30/hour",
						originalPrice: "$40/hour",
					},
				],
			},
			portfolioWebsites: {
				title: "Portfolio Websites",
				services: [
					{
						name: "One-Page Portfolio (hero + 5–7 sections, light animation)",
						price: "$449–$649",
					},
					{ name: "Multi-Page (3–5 simple pages)", price: "$349–$499" },
					{
						name: "Premium (5+ pages, CMS/blog, tech SEO)",
						price: "from $849",
					},
					{ name: "Maintenance", price: "$20–$40/month" },
				],
			},
		},
		faq: {
			title: "Frequently Asked Questions",
			items: [
				{
					question: "How long does it take to complete a website?",
					answer:
						"Typically, a basic website takes 2-3 weeks, a professional site 4-6 weeks, and enterprise solutions 8-12 weeks. Timeline varies based on project complexity and feedback cycles.",
				},
				{
					question: "Do you offer maintenance plans?",
					answer:
						"Yes, I offer monthly maintenance plans starting at $99/month which include updates, security patches, and minor content changes.",
				},
				{
					question: "What payment methods do you accept?",
					answer:
						"I accept credit cards, PayPal, and bank transfers. Projects typically require a 50% deposit upfront with the remainder due upon completion.",
				},
				{
					question: "Can I update the website myself?",
					answer:
						"Absolutely! I build sites with user-friendly content management systems and provide training so you can make updates independently.",
				},
			],
		},
		termsOfService: {
			title: "Terms of Service",
			sections: {
				paymentTerms: {
					title: "Payment Terms",
					items: [
						"Projects typically require a 50% deposit to begin. The remaining balance is due upon completion and prior to launch or transfer of assets.",
						"Invoices are payable within 7 days unless otherwise agreed. Late payments may pause work and can incur a late fee.",
						"Rush work (expedited timelines) may be subject to a surcharge.",
					],
				},
				scope: {
					title: "Scope, Revisions & Change Requests",
					items: [
						"Each package includes a defined number of revision rounds; additional revisions or scope changes are billed at the hourly rate.",
						"Significant changes that deviate from the agreed scope may require a revised quote and timeline.",
						"Content entry covers reasonable amounts of copy and images. Bulk data entry or migrations can be quoted separately.",
					],
				},
				timeline: {
					title: "Project Timeline & Client Responsibilities",
					items: [
						"Estimated delivery times assume timely client feedback and provision of assets. Delays in approvals or content will extend timelines.",
						"Projects inactive for more than 30 days may be archived and subject to a restart fee.",
						"Final acceptance occurs after your review and approval of the agreed deliverables.",
					],
				},
				ownership: {
					title: "Ownership, Portfolio & Attribution",
					items: [
						"Upon full payment, you own the final deliverables (code, designs, and assets that I created for the project).",
						"I may showcase the work in my portfolio and marketing materials unless otherwise agreed in writing.",
						"Clients must ensure they have valid licenses for any content or third‑party assets they provide.",
					],
				},
				technical: {
					title: "Technical Standards & Third‑Party Services",
					items: [
						"Websites are built to modern best practices and tested on current versions of major browsers. Legacy browser support can be scoped separately.",
						"Performance, SEO, and accessibility are implemented to reasonable standards but cannot guarantee specific rankings, scores, or outcomes.",
						"Hosting, domains, analytics, payment providers, and other third‑party services remain your responsibility, including fees and terms.",
					],
				},
				warranty: {
					title: "Warranty, Maintenance & Support",
					items: [
						"Bug fixes for work delivered are covered for a short warranty period after launch (reasonable defects attributable to my work).",
						"Ongoing maintenance and feature requests are available under separate agreements or hourly billing.",
						"Support is provided during standard business hours unless a different arrangement is agreed.",
					],
				},
				cancellation: {
					title: "Cancellation & Termination",
					items: [
						"If a project is cancelled after work has begun, payment is due for work completed up to that point. The initial deposit is non‑refundable.",
						"Either party may terminate the project for material breach with written notice.",
					],
				},
				liability: {
					title: "Liability & Force Majeure",
					items: [
						"To the fullest extent permitted by law, liability is limited to the amount paid for the specific services rendered.",
						"Neither party is liable for delays or failures due to events beyond reasonable control (force majeure).",
					],
				},
				unlimitedPages: {
					title: 'Clarification on "Unlimited Pages"',
					description:
						'"Unlimited pages" refers to there being no preset hard cap within normal business needs for templated pages and routes. It does not mean infinite pages or unbounded content entry. High‑volume catalogs, massive blogs, bulk imports, or programmatic page generation may require separate scoping, automation, or additional fees. Content entry is covered to a reasonable extent; very large content volumes can be quoted separately.',
				},
			},
		},
		cta: {
			title: "Ready to Get Started?",
			description:
				"Contact us today for a free consultation and let's discuss how I can bring your vision to life.",
			buttonText: "Contact Me",
		},
	},
	projects: {
		title: "Projects",
		noProjectsFound: "No projects found for the selected filter.",
		filters: {
			all: "All",
			games: "Games",
			webApps: "Web Apps",
			desktop: "Desktop",
			mobile: "Mobile",
			websites: "Web Sites",
			mods: "Mods",
		},
		categories: {
			webApps: "Web apps",
			mobile: "Mobile App",
			games: "Game",
			desktop: "Desktop App",
			websites: "Web Site",
			mods: "Game Mod",
		},
		status: {
			inDevelopment: "In Development",
			completed: "Completed",
			archived: "Archived",
			concept: "Concept",
			onHold: "On Hold",
		},
		sections: {
			about: "About",
			features: "Features",
			development: "Development",
			details: "Details",
			category: "Category",
			statusLabel: "Status",
			role: "Role",
			timeline: "Timeline",
			platform: "Platform",
			technologies: "Technologies",
			relatedLinks: "Related Links",
		},
		cta: {
			title: "Support Our Work",
			description: "Support us to get exclusive updates and rewards",
			patreon: "Patreon",
			githubSponsors: "Github Sponsors",
		},
		data: [
			{
				slug: "familiar-art",
				title: "Familiar - Art marketplace",
				description: "Modern and easy tool for artist of all kind.",
				category: ["webApps", "mobile"],
				status: ["inDevelopment", "concept"],
				technologies: ["TanStack", "React", "Tailwindcss", "E-commerce"],
				links: [
					{
						name: "Soon",
						url: "#",
						description: "soon",
					},
				],
				// thumbnail: {
				//   square: {
				//     src: zaczkie_large.src,
				//     alt: "Zaczkie Art Portfolio Preview",
				//     blur: zaczkie_large.src
				//   },
				//   large: {
				//     src: zaczkie_large.src,
				//     alt: "Zaczkie Art Portfolio Preview",
				//     blur: zaczkie_large.src
				//   }
				// },
				content: {
					about: ["Modern marketplace for artist of all kind."],
					features: ["Soon"],
				},
				details: {
					role: "UI/UX designer",
					timeline: "1/1/2026 - Present",
					platform: "Web",
				},
			},
			{
				slug: "zaczkie-art",
				title: "Zaczkie Art",
				description: "Portfolio website for digital artist and illustrator",
				category: ["websites"],
				status: ["completed"],
				technologies: [
					"Next.js",
					"React",
					"CSS",
					"Responsive Design",
					"Gallery System",
				],
				links: [
					{
						name: "Website",
						url: "https://zaczkie.art",
						description: "Live portfolio website",
					},
				],
				thumbnail: {
					square: {
						src: zaczkie_large.src,
						alt: "Zaczkie Art Portfolio Preview",
						blur: zaczkie_large.src,
					},
					large: {
						src: zaczkie_large.src,
						alt: "Zaczkie Art Portfolio Preview",
						blur: zaczkie_large.src,
					},
				},
				content: {
					about: [
						"Custom portfolio website for Zaczkie, showcasing digital art and illustrations.",
						"Features an intuitive gallery system with category filtering and responsive design.",
						"Optimized for fast loading of high-quality artwork images.",
					],
					features: [
						"Categorized art gallery",
						"Commission information",
						"Artist bio and contact",
						"Mobile-friendly design",
					],
				},
				details: {
					role: "Web Developer",
					timeline: "07/23/2025",
					platform: "Web",
				},
			},
			{
				slug: "jarvvitch-art",
				title: "Jarvvitch Art",
				description: "Portfolio website for digital artist",
				category: ["websites"],
				status: ["completed"],
				technologies: [
					"Next.js",
					"React",
					"Tailwind CSS",
					"Responsive Design",
					"Image Optimization",
				],
				links: [
					{
						name: "Website",
						url: "https://www.jarvvitch.art/",
						description: "Live portfolio website",
					},
				],
				thumbnail: {
					square: {
						src: jarvvitch_large.src,
						alt: "Jarvvitch Art Portfolio Preview",
						blur: jarvvitch_large.src,
					},
					large: {
						src: jarvvitch_large.src,
						alt: "Jarvvitch Art Portfolio Preview",
						blur: jarvvitch_large.src,
					},
				},
				content: {
					about: [
						"Portfolio website designed for a digital artist to showcase their artwork and illustrations.",
						"Features a clean, minimalist design that puts the focus on the artwork with responsive layout for all devices.",
						"Includes gallery sections, about page, and contact information.",
					],
					features: [
						"Responsive image gallery",
						"Optimized image loading",
						"Clean navigation",
						"Contact form",
					],
				},
				details: {
					role: "Web Developer",
					timeline: "09/11/2025",
					platform: "Web",
				},
			},
			{
				slug: "rabbit-hole-social",
				title: "Rabbit Hole",
				description: "Social portal for artists and clients",
				category: ["webApps"],
				status: ["archived"],
				technologies: [
					"Next.js (App Router)",
					"Tailwind CSS v4",
					"shadcn/ui",
					"Zod v4",
					"Supabase Auth",
					"Supabase Postgres",
					"Drizzle ORM",
					"TanStack React Query",
					"Biome.js",
					"JWT Authentication",
				],
				links: [
					{
						name: "Next.js Documentation",
						url: "https://nextjs.org/docs",
						description: "Framework powering Rabbit Hole",
					},
					{
						name: "Supabase Platform",
						url: "https://supabase.com",
						description: "Database and authentication provider",
					},
				],
				// thumbnail: {
				//   square: {
				//     src: portfolio_small.src,
				//     alt: "Portfolio Website Preview",
				//     blur: portfolio_small.src
				//   },
				//   large: {
				//     src: portfolio_large.src,
				//     alt: "Portfolio Website Preview",
				//     blur: portfolio_large.src
				//   }
				// },
				content: {
					about: [
						"RabbitHole is an exclusive social platform where artists share content in themed communities called 'rabbit holes'. The platform features a dual-account system: Artist accounts (requiring invite keys) can create content, while Client accounts can interact but not create.",
						"The platform uses an invite-based registration system where artists receive new keys every two weeks to share with other creators, maintaining exclusivity while allowing controlled growth of the creator community.",
						"Built with Next.js App Router, the application delivers a responsive experience with features like infinite scroll feeds, optimistic UI updates, and secure authentication through JWT and HttpOnly cookies.",
					],
					features: [
						"Masonry/grid feed of posts with infinite scroll and 60-second revalidation",
						"Dual-account system with Artist and Client roles and permissions",
						"Invite key system for exclusive artist registration",
						"Community-based content organization through 'rabbit holes'",
						"Comprehensive JWT authentication with HttpOnly cookies",
						"Real-time form validation with Zod schemas",
						"Optimistic UI updates for instant feedback",
						"Role-based access control with different permission levels",
						"Post interactions including likes, bookmarks, reposts, and comments",
						"User profiles with posts and statistics",
						"Premium features through 'Golden Carrot' subscription",
					],
					development:
						"Currently in active development with focus on implementing the core social features and authentication system.",
				},
				details: {
					role: "Full-Stack Developer",
					timeline: `9/20/2024 - 12/6/2026`,
					platform: "Web Application",
				},
			},
			{
				slug: "soundless",
				title: "SoundLess",
				description:
					"An innovative horror game where players navigate through darkness using echolocation mechanics and sound-based gameplay.",
				category: ["games", "desktop"],
				status: ["onHold", "concept"],
				technologies: [
					"Godot",
					"GDScript",
					"Sound Design",
					"Shader Programming",
				],
				links: [
					{
						name: "Wishlist on Steam",
						url: "https://store.steampowered.com",
						description: "Wishlist our game on steam now!",
					},
					{
						name: "Webtoon Comic",
						url: "https://www.webtoons.com",
						description: "Read the companion comic",
					},
				],
				thumbnail: {
					square: {
						src: soundless_small.src,
						alt: "SoundLess Game Preview",
						blur: soundless_small.src,
					},
					large: {
						src: soundless_large.src,
						alt: "SoundLess Game Preview",
						blur: soundless_large.src,
					},
				},
				content: {
					about: [
						"SoundLess is a unique horror experience that challenges players to navigate through complete darkness using only sound. The game features an innovative echolocation system where players must use sound waves to reveal their surroundings and avoid dangers.",
						"The game's custom sound propagation system creates realistic audio behavior, with sounds bouncing off walls and objects, creating an immersive and terrifying atmosphere.",
						"Players must carefully balance their use of sound, as making too much noise can attract unwanted attention from the entities that lurk in the darkness.",
					],
					features: [
						"Innovative echolocation gameplay mechanics",
						"Custom sound propagation and reflection system",
						"Dynamic environment interactions based on sound",
						"Atmospheric horror elements and storytelling",
						"Unique visual effects for sound visualization",
						"Adaptive AI that responds to player-generated sounds",
					],
					development:
						"Currently in active development, focusing on perfecting the sound propagation system and environmental interactions.",
				},
				details: {
					role: "Game Director, Art Director & Design Director",
					timeline: "8/20/2024 - Present",
					platform: "PC",
				},
			},
			{
				slug: "tinybuddies",
				title: "TinyBuddies",
				description:
					"A cute virtual pet game where players can adopt, raise, and play with adorable creatures.",
				category: ["games", "mobile"],
				status: ["onHold", "archived"],
				technologies: ["Godot", "GDScript", "Game Design"],
				// thumbnail: {
				//   square: {
				//     src: tinybuddies_small.src,
				//     alt: "TinyBuddies Game Preview",
				//     blur: tinybuddies_small.src
				//   },
				//   large: {
				//     src: tinybuddies_large.src,
				//     alt: "TinyBuddies Game Preview",
				//     blur: tinybuddies_large.src
				//   }
				// },
				content: {
					about: [
						"TinyBuddies brings back the nostalgic joy of virtual pet care with a modern twist. Each buddy has its own personality, preferences, and unique behaviors that evolve based on how you interact with them.",
						"The game features real-time care mechanics, where your buddies continue to live and grow even when you're not actively playing. Push notifications keep you connected with your pets' needs throughout the day.",
						"With customizable environments, mini-games, and social features, TinyBuddies aims to create a warm, engaging experience that fits seamlessly into players' daily routines.",
					],
					features: [
						"Real-time pet care with dynamic personality development",
						"Push notifications for important pet needs and milestones",
						"Customizable rooms and environments for your buddies",
						"Mini-games and activities to bond with your pets",
						"Social features to share and visit friends' buddies",
						"Extensive customization options for pets and habitats",
					],
					development:
						"Currently stopped due to personal reasons. Will resume when I have more time.",
				},
				details: {
					role: "Project Director & Game Designer",
					timeline: "03/12/2024 - Present",
					platform: "iOS & Android",
				},
			},
		],
	},
	experience: {
		title: "Experience",
		subtitle:
			"A chronological journey through my professional experience and education.",
		dateFormats: {
			short: "MM/DD/YYYY",
			medium: "MMM YYYY",
			long: "MMMM YYYY",
		},
		data: [
			{
				company: "Gecko Creative",
				position: "Freelancer, coordination leader",
				type: "Full-time",
				startDate: "2023",
				endDate: "present",
				description:
					"Co-founded and leading a game development studio with a team of 10+ artists and developers",
				achievements: [
					"Founded and scaled the studio to 10+ team members",
					"Leading development of multiple game projects",
					"Creating TinyBuddies mobile game and SoundLess horror experience",
					"Managing team collaboration and project coordination",
					"Establishing studio's technical infrastructure and workflows",
				],
				tags: [
					"Game Development",
					"Godot",
					"GDScript",
					"Team Leadership",
					"Project Management",
					"Game Design",
					"UI/UX Design",
				],
				projects: [
					{
						name: "TinyBuddies",
						description:
							"A charming mobile game where players nurture and raise unique virtual pets in a cozy pixel art world. Features dynamic pet personalities, mini-games, and social interactions.",
						link: "",
					},
					{
						name: "SoundLess",
						description:
							"An innovative horror game where players navigate through darkness using echolocation mechanics. Built with custom sound propagation system and dynamic environment interactions.",
						link: "",
					},
				],
			},
			{
				company: "DIGITAL-SERVICE",
				position: "Frontend Developer",
				type: "Part-time",
				startDate: "24.04.2018",
				endDate: "26/06/2023",
				description:
					"Developing and maintaining client websites using WordPress and modern web technologies",
				achievements: [
					"Built and maintained multiple client websites",
					"Implemented custom WordPress themes and plugins",
					"Optimized website performance and SEO",
					"Collaborated with clients to meet their specific requirements",
					"Managed website hosting and maintenance",
				],
				tags: [
					"WordPress",
					"PHP",
					"JavaScript",
					"HTML",
					"CSS",
					"jQuery",
					"SEO",
					"Web Hosting",
					"Client Communication",
				],
			},
			// {
			//   company: "Middle School",
			//   position: "Student",
			//   type: "Education",
			//   startDate: "2015",
			//   endDate: "2018",
			//   description: "Completed middle school education.",
			//   achievements: [],
			//   tags: []
			// }
		],
	},
	patrons: {
		title: "Patrons & Supporters",
		description:
			"Thank you to all the amazing people who support my work through GitHub Sponsors and Patreon. Your support helps me continue creating open-source projects and content.",
		githubSponsors: {
			title: "GitHub Sponsors",
			description:
				"Special thanks to my GitHub Sponsors who help fund my open-source contributions.",
			becomeASponsor: "Become a GitHub Sponsor",
			noSponsors: "No GitHub sponsors yet. Be the first to support my work!",
			loading: "Loading GitHub sponsors...",
			emptyTitle: "No GitHub Sponsors Yet",
			emptyDescription:
				"Be the first to support my open-source work! Your sponsorship helps me continue creating and maintaining projects.",
		},
		patreonSupporters: {
			title: "Patreon Supporters",
			description:
				"Amazing supporters from Patreon who help me create content and work on exciting projects.",
			becomeAPatron: "Become a Patreon",
			becomeASupporter: "Become a Patreon Supporter",
			noPatrons:
				"No Patreon supporters yet. Join the community and support my work!",
			noSupporters:
				"No Patreon supporters yet. Join the community and support my work!",
			loading: "Loading Patreon supporters...",
			emptyTitle: "No Patreon Supporters Yet",
			emptyDescription:
				"Be the first to support my work on Patreon! Your support helps me create more content and maintain my projects.",
		},
		common: {
			perMonth: "/month",
			supportingSince: "Supporting since",
			oneTime: "one-time",
			custom: "Custom",
			showMore: "Show More",
			showLess: "Show Less",
			itemsPerPage: "items per page",
			filterBy: "Filter by",
			sortBy: "Sort by",
			allTiers: "All Tiers",
			amount: "Amount",
			date: "Date",
			name: "Name",
			highToLow: "High to Low",
			lowToHigh: "Low to High",
			newest: "Newest",
			oldest: "Oldest",
		},
		cta: {
			title: "Support My Work",
			description:
				"Your support helps me dedicate more time to open-source projects, create educational content, and build amazing tools for the community.",
			githubSponsors: "GitHub Sponsors",
			patreon: "Patreon",
		},
	},
	about: {
		title: "About Me",
		name: "Kris German",
		role: "Designer & Developer",
		bio: {
			intro:
				"Hi! I'm Krystian German, a {age}-year-old designer and developer from Poland. I started my journey in design back in 2016, and since then I've been passionate about creating beautiful, functional digital experiences.",
			projects:
				"Over the years, I've worked on various projects ranging from games to web appliactions. I love exploring new technologies and pushing the boundaries of what's possible.",
		},
		experience: {
			label: "Experience",
			years: "Years",
			since: "Since",
		},
		skills: {
			title: "Skills",
			design: {
				title: "Design",
				items: [
					"UI/UX Design",
					"Brand Identity",
					"Game Design",
					"Visual Design",
				],
			},
			development: {
				title: "Development",
				items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
			},
			tools: {
				title: "Tools",
				items: ["Figma", "VS Code", "Git"],
			},
		},
	},
	home: {
		hero: {
			greeting: "Hi, I'm Kris",
			roles: [
				"Designer",
				"Developer",
				"Game Creator",
				"Open Source Contributor",
			],
			description:
				"I'm passionate about creating creative stuff. I specialize in UI/UX design and development, and lately I'm also game developer.",
		},
		experience: {
			title: "Experience",
			subtitle: "Recent highlights from my professional journey.",
			projectsLabel: "Projects",
			achievementsLabel: "Key Achievements",
			viewProject: "View Project",
			showDetails: "Show Details",
			viewFullExperience: "View Full Experience",
		},
		featuredProjects: {
			title: "Featured Projects",
			subtitle: "A selection of my recent work.",
		},
		honorsAwards: {
			title: "Honors & Awards",
			subtitle: "Recognition for my work and contributions.",
		},
		connect: {
			title: "Let's Connect",
			subtitle: "Find me on these platforms.",
		},
		cta: {
			title: "Ready to start your project?",
			subtitle: "Let's work together to bring your ideas to life.",
			button: "Get in touch",
		},
	},
	cv: {
		title: "Curriculum Vitae",
		tip: "Tip: Toggle to light mode for best export contrast.",
		downloadPng: "Download as PNG",
		downloadPdf: "Download as PDF",
		exporting: "Exporting…",
		fileName: {
			png: "CV-Krystian-German-EN.png",
			pdf: "CV-Krystian-German-EN.pdf",
		},
		content: {
			name: "Krystian German",
			tagline: "Front-End Developer • UI/UX Enthusiast",
			contact: {
				email: "kris@hasira.me",
				phone: "+48 123 456 789",
				location: "Gdańsk, Poland",
				website: "hasira.me",
				labels: {
					email: "Email:",
					phone: "Phone:",
					location: "Location:",
					website: "Website:",
				},
			},
			headings: {
				skills: "Skills",
				tools: "Tools",
				education: "Education",
				languages: "Languages",
				summary: "Summary",
				experience: "Experience",
				projects: "Projects",
			},
			skills: [
				"Web Programming Languages (JavaScript/Typescript, React, CSS)",
				"Basic Linux server management",
				"UI Design",
				"UX Improvement",
			],
			tools: ["Git & GitHub", "Figma", "Visual Studio Code"],
			languages: [
				{ language: "Polish", level: "Native" },
				{ language: "English", level: "Communicative" },
			],
			education: [
				{
					degree: "Student",
					school: "Middle School in Cedry Wielkie",
					period: "2014–2018",
				},
			],
			summary:
				"Front-end developer with a passion for building accessible, performant, and visually engaging web apps. Experienced with React and modern tooling, focused on clean UI and thoughtful UX.",
			experience: [
				{
					roleCompany: "Freelancer indie games • Gecko Creative",
					period: "2023 — Present",
					location: "Gdańsk",
					bullets: [
						"Learning and building games using Godot (GDScript)",
						"Leading early-stage indie projects (TinyBuddies, SoundLess prototype)",
						"Organizing a team and preparing to register a company",
					],
				},
				{
					roleCompany: "Frontend Developer • DIGITAL-SERVICE",
					period: "2018 — 2023",
					location: "Kiezmark",
					bullets: [
						"Created and maintained numerous websites for clients",
						"Implemented custom WordPress themes and plugins",
						"Optimized website performance and SEO",
						"Collaborated with clients to meet their specific requirements",
						"Managed website hosting and ongoing website maintenance",
					],
				},
			],
			gdprConsent:
				"I consent to the processing of my personal data for recruitment purposes in accordance with the Personal Data Protection Act.",
		},
	},
	contact: {
		title: "Get in Touch",
		description: "Let's discuss your project or just say hello",
		header: {
			title: "Get in Touch",
			description: "Let's discuss your project or just say hello",
		},
		form: {
			title: "Send a Message",
			sending: "Sending...",
			successMessage:
				"Message sent successfully! Thank you {name}, I'll get back to you soon.",
			errorMessage:
				"Failed to send message. Please try again or use another contact method.",
			submit: "Send Message",
			recaptchaNotice:
				"This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service.",
			privacyPolicy: "Privacy Policy",
			termsOfService: "Terms of Service",
			and: "and",
			apply: "apply",
			fields: {
				name: "Name",
				namePlaceholder: "Your name",
				email: "Email",
				emailPlaceholder: "your@email.com",
				message: "Message",
				messagePlaceholder: "Tell me about your project...",
			},
		},
		otherWays: {
			title: "Other Ways to Reach Me",
			email: {
				title: "Email",
				value: "kris@hasira.me",
				description: "Best for business inquiries",
			},
			discord: {
				title: "Discord",
				value: "hasiradoo",
				description: "Quick chats and questions",
			},
			telegram: {
				title: "Telegram",
				value: "@hasiradooo",
				description: "I'm here 99% of the time",
			},
			twitter: {
				title: "Twitter",
				value: "@hasiradoo",
				description: "Follow my journey",
			},
			bsky: {
				title: "Bsky",
				value: "@hasira.me",
				description: "Follow my journey",
			},
		},
		availability: {
			title: "Availability",
			description:
				"Currently available for new projects and collaborations. I typically respond within 24 hours.",
		},
	},
	footer: {
		personalInfo: {
			name: "Krystian German",
			role: "Designer & Developer",
			since: "Since 2016",
		},
		sections: {
			socials: "Socials",
			navigation: "Navigation",
			resources: "Resources",
		},
		socialLinks: {
			github: "GitHub",
			twitter: "Twitter",
			bsky: "Bsky",
			patreon: "Patreon",
			discord: "Discord",
			telegram: "Telegram",
		},
		navigationLinks: {
			home: "Home",
			about: "About",
			projects: "Projects",
			experience: "Experience",
			patrons: "Patrons",
			contact: "Contact",
		},
		resourceLinks: {
			gameStudio: "Gecko Creative",
			blog: "Blog",
			sourceCode: "Source Code",
		},
		copyright: {
			allRightsReserved: "All rights reserved",
			madeBy: "Made by Kris German",
		},
	},
};

export default dict;
