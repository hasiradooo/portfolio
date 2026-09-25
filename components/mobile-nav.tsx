"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function MobileNav({
	items,
	className,
}: {
	items: { href: string; label: string }[];
	className?: string;
}) {
	const [open, setOpen] = React.useState(false);
	const pathname = usePathname();

	// Prevent scrolling when popover is open
	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					className={cn(
						"h-8 items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
						className,
					)}
				>
					<div className="relative flex h-8 w-4 items-center justify-center">
						<div className="relative size-4">
							<span
								className={cn(
									"bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
									open ? "top-[0.4rem] -rotate-45" : "top-1",
								)}
							/>
							<span
								className={cn(
									"bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
									open ? "top-[0.4rem] rotate-45" : "top-2.5",
								)}
							/>
						</div>
						<span className="sr-only">Toggle Menu</span>
					</div>
					<span className="flex h-8 items-center text-lg leading-none font-medium">
						Menu
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
				align="start"
				side="bottom"
				alignOffset={0}
				sideOffset={4}
			>
				<div className="flex flex-col gap-12 overflow-auto px-6 py-6">
					<div className="flex flex-col gap-4">
						<div className="text-muted-foreground text-sm font-medium">
							Menu
						</div>
						<div className="flex flex-col gap-3">
							{items.map((item, index) => {
								const isActive =
									item.href === "/"
										? pathname === "/" || pathname === ""
										: pathname === item.href;

								return (
									<MobileLink
										key={index}
										href={item.href}
										onOpenChange={setOpen}
										isActive={isActive}
									>
										{item.label}
									</MobileLink>
								);
							})}
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}

function MobileLink({
	href,
	onOpenChange,
	className,
	children,
	isActive,
	...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
	className?: string;
	isActive?: boolean;
}) {
	const router = useRouter();
	return (
		<Link
			href={href}
			onClick={() => {
				router.push(href.toString());
				onOpenChange?.(false);
			}}
			className={cn(
				"text-2xl font-mono uppercase tracking-wider relative group focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-ring",
				isActive
					? "text-gray-900 dark:text-gray-100"
					: "text-gray-600 dark:text-gray-400",
				className,
			)}
			{...props}
		>
			{children}
			<span
				className={cn(
					"absolute -bottom-1 left-0 w-full h-0.5 bg-foreground transform origin-left transition-transform duration-200",
					isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
				)}
			/>
		</Link>
	);
}
