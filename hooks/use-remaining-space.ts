"use client";

import { useEffect, useRef, useState } from "react";

export const useRemainingSpace = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [space, setSpace] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const calculateSpace = () => {
			if (!containerRef.current) return;

			const container = containerRef.current;
			const children = Array.from(container.children);

			// Oblicz calkowita wysokosc dzieci (bez elementu z pattern)
			const totalChildrenHeight = children.reduce((acc, child) => {
				if (child.classList.contains("pattern-bg")) return acc;
				return acc + child.getBoundingClientRect().height;
			}, 0);

			// Oblicz dostepna przestrzen
			const containerHeight = container.getBoundingClientRect().height;
			const remainingHeight = Math.max(
				0,
				containerHeight - totalChildrenHeight,
			);

			setSpace({
				width: container.getBoundingClientRect().width,
				height: remainingHeight,
			});
		};

		// Oblicz przy montowaniu i przy zmianach rozmiaru
		calculateSpace();
		window.addEventListener("resize", calculateSpace);

		return () => window.removeEventListener("resize", calculateSpace);
	}, []);

	return { containerRef, space };
};
