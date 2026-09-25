import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
	{
		variants: {
			variant: {
				default:
					"border-border bg-background text-foreground [a&]:hover:bg-accent",
				secondary:
					"border-border bg-muted text-foreground dark:text-foreground/80 [a&]:hover:bg-accent",
				destructive:
					"border-border bg-destructive/10 text-destructive [a&]:hover:bg-destructive/20 focus-visible:ring-destructive/20",
				outline:
					"border-border bg-background text-foreground [a&]:hover:bg-accent",
				stable:
					"border-border bg-green-500/10 text-green-700 dark:text-green-300 group-hover:bg-green-500/20",
				beta: "border-border bg-blue-500/10 text-blue-700 dark:text-blue-300 group-hover:bg-blue-500/20",
				alpha:
					"border-border bg-purple-500/10 text-purple-700 dark:text-purple-300 group-hover:bg-purple-500/20",
				development:
					"border-border bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 group-hover:bg-yellow-500/20",
				concept:
					"border-border bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 group-hover:bg-indigo-500/20",
				archived:
					"border-border bg-gray-500/10 text-gray-700 dark:text-gray-300 group-hover:bg-gray-500/20",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
