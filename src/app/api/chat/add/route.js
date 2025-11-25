import { NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import Userslist from "@/models/Userslist";

export async function POST(req) {
    try {
        await connectMongo();
        console.log("📡 Mongo Connected");

        const { userId, friend } = await req.json();
        console.log("➡️ Add Chat Request: ", userId, friend);

        if (!userId || !friend) {
            return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
        }

        // Check if already exists before pushing
        const user = await Userslist.findById(userId);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        console.log(user, friend)

        const exists = user.chatList?.some((f) => f.username === friend.username);

        if (exists) {
            return NextResponse.json(
                { message: "Already in chat list", chatList: user.chatList },
                { status: 200 }
            );
        }

        // Push using updateOne (this works reliably!)
        await Userslist.updateOne(
            { _id: userId },
            { $push: { chatList: friend } }
        );

        console.log("✔ Friend added to DB");

        // Fetch updated list
        const updatedUser = await Userslist.findById(userId);

        return NextResponse.json(
            { message: "Friend added successfully", chatList: updatedUser.chatList },
            { status: 200 }
        );

    } catch (err) {
        console.error("❌ Server Error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
