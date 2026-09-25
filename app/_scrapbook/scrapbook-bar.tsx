import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "./scrapbook-icon";
import styles from "./scrapbook-bar.module.css";

export default function ScrapbookBar({
	href,
	backLabel,
	address,
	children,
}: {
	href: string;
	backLabel: string;
	address: string;
	children: ReactNode;
}) {
	return (
		<header className={styles.bar}>
			<Link href={href}>
				<Icon name="back" /> {backLabel}
			</Link>
			<span className={styles.address}>{address}</span>
			<div className={styles.actions}>{children}</div>
		</header>
	);
}
