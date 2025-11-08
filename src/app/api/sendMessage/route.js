import mongoose from "mongoose";
import connectMongo from "@/lib/connectMongo";
import User from "@/models/Userslist";

// ✅ Function to dynamically create/get a message model
const getMessageModel = (chatId) => {
    const messageSchema = new mongoose.Schema(
        {
            sender: { type: String, required: true },
            receiver: { type: String, required: true },
            content: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
        { collection: chatId } // force collection name
    );

    return mongoose.models[chatId] || mongoose.model(chatId, messageSchema);
};

export async function POST(req) {
    try {
        await connectMongo();

        const { sender, receiver, content } = await req.json();
        if (!sender || !receiver || !content) {
            return Response.json({ error: "Missing fields" }, { status: 400 });
        }

        // ✅ Create separate chat IDs for sender and receiver
        const senderChatId = `${sender}_${receiver}_messages`;
        const receiverChatId = `${receiver}_${sender}_messages`;

        // ✅ Get or create message models
        const SenderMessage = getMessageModel(senderChatId);
        const ReceiverMessage = getMessageModel(receiverChatId);

        // ✅ Save message in both collections
        await SenderMessage.create({ sender, receiver, content });
        await ReceiverMessage.create({ sender, receiver, content });

        // ✅ Update chatdata in sender
        await User.updateOne(
            { username: sender, "chatdata.friend": { $ne: receiver } },
            { $addToSet: { chatdata: { chatId: senderChatId, friend: receiver } } }
        );

        // ✅ Update chatdata in receiver
        await User.updateOne(
            { username: receiver, "chatdata.friend": { $ne: sender } },
            { $addToSet: { chatdata: { chatId: receiverChatId, friend: sender } } }
        );

        console.log("✅ Message saved separately for both users.");

        return Response.json({ success: true, message: "Message sent" }, { status: 200 });
    } catch (err) {
        console.error("❌ Error sending message:", err);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
