import connectDB from "@/lib/connectMongo";
import Userslist from "@/models/Userslist";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const user = searchParams.get("user");
        const friend = searchParams.get("friend");

        if (!user || !friend) {
            return Response.json({ error: "Missing users" }, { status: 400 });
        }

        // ✅ Find the requesting user's document
        const userData = await Userslist.findOne({ username: user });

        if (!userData) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        // ✅ Find the chat object for the friend
        const chat = userData.chatdata.find(
            (chat) => chat.friend === friend
        );

        if (!chat) {
            return Response.json({ messages: [] }, { status: 200 }); // no chat yet
        }

        // ✅ Sort messages by timestamp (ascending)
        const messages = chat.messages.sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );

        return Response.json({ messages }, { status: 200 });
    } catch (err) {
        console.error("❌ Error fetching messages:", err);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
