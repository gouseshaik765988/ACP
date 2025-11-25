import { NextResponse } from "next/server";
import connectDB from "@/lib/connectMongo";
import Userslist from "@/models/Userslist";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { username } = await req.json();

        if (!username) {
            return NextResponse.json(
                { error: "Username is required" },
                { status: 400 }
            );
        }

        const user = await Userslist.findOne({ username });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
