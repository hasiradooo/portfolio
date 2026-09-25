import { NextResponse } from "next/server";
import { fetchPatreonSupporters } from "@/lib/patreon-supporters";

export async function GET() {
	try {
		const patreonData = await fetchPatreonSupporters();
		return NextResponse.json(patreonData);
	} catch (error) {
		console.error("Error in patreon API route:", error);
		return NextResponse.json({ supporters: [] }, { status: 500 });
	}
}
