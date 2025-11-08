import mongoose from "mongoose";
import connectDB from "@/lib/connectMongo";

const getMessageModel = (chatId) => {
    const schema = new mongoose.Schema(
        {
            sender: { type: String, required: true },
            receiver: { type: String, required: true },
            content: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
        { collection: chatId } // ✅ force to use the same collection name
    );

    return mongoose.models[chatId] || mongoose.model(chatId, schema);
};

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const user = searchParams.get("user");
        const friend = searchParams.get("friend");

        if (!user || !friend) {
            return Response.json({ error: "Missing users" }, { status: 400 });
        }

        // ✅ Must use sorted combination (same as sendMessage)
        const chatId = [user, friend].sort().join("_") + "_messages";
        const Message = getMessageModel(chatId);

        // ✅ Fetch all messages for this chat
        const messages = await Message.find({}).sort({ timestamp: 1 });

        return Response.json({ messages }, { status: 200 });
    } catch (err) {
        console.error("❌ Error fetching messages:", err);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
