import { NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import Userslist from "@/models/Userslist";

export async function POST(req) {
    try {
        await connectMongo();

        const { userId } = await req.json();
        const user = await Userslist.findById(userId);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ chatList: user.chatList }, { status: 200 });

    } catch (err) {
        console.error(err);
    }
}
