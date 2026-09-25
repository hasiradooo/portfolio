import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"flex min-h-[80px] w-full bg-foreground/[0.02] px-3 py-2 text-sm text-foreground",
				"border-0 outline-none focus:ring-2 focus:ring-foreground/20",
				"placeholder:text-muted-foreground",
				"disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
