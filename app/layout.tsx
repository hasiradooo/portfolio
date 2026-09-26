import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";

const geistMono = Geist_Mono({
	subsets: ["latin"],
});

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistMono.className} antialiased min-h-screen flex flex-col select-none`}
			>
				{children}
				<Analytics />
				<Toaster />
			</body>
		</html>
	);
}
