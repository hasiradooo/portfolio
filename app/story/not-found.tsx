import Link from "next/link";
import styles from "./story.module.css";
export default function MissingChapter() {
	return (
		<section className={styles.sheet}>
			<p className={styles.label}>A LOOSE PAGE…</p>
			<h1>this chapter isn’t here.</h1>
			<p>
				Find your place in the chapter list, or{" "}
				<Link href="/story">head back to the notebook</Link>.
			</p>
		</section>
	);
}
