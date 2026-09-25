"use client";

import { OutlineGlobe } from "@/icons/Icons";
import { useLanguage } from "@/app/providers/language-provider";
import { ModeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function FloatingControls() {
	const { locale, setLocale, available } = useLanguage();

	return (
		<div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
			{/* Language selector dropdown */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={"outline"} size={"xlIcon"}>
						<OutlineGlobe className="h-4 w-4" />
						<span className="sr-only">Change language</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent side="left" align="end">
					{available.map(({ code, label }) => (
						<DropdownMenuItem
							key={code}
							className={cn(
								"cursor-pointer",
								locale === code ? "font-bold" : "",
							)}
							onClick={() => setLocale(code)}
						>
							{label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<ModeToggle />
		</div>
	);
}
