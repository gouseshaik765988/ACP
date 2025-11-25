import connectMongo from "@/lib/connectMongo";
import User from "@/models/Userslist";

export async function POST(req) {
    try {
        await connectMongo();

        const { sender, receiver, content } = await req.json();
        if (!sender?.trim() || !receiver?.trim() || !content?.trim()) {


            return Response.json({ error: "Missing fields" }, { status: 400 }

            );

        }

        // create a unique chatId for both users
        const chatId = [sender, receiver].sort().join("_");

        // create the message object
        const newMessage = { sender, receiver, content, timestamp: new Date() };

        // ✅ Update sender’s chatdata
        await User.updateOne(
            { username: sender, "chatdata.friend": receiver },
            { $push: { "chatdata.$.messages": newMessage } }
        );

        // if chat not exist, create it
        await User.updateOne(
            { username: sender, "chatdata.friend": { $ne: receiver } },
            {
                $push: {
                    chatdata: {
                        chatId,
                        friend: receiver,
                        messages: [newMessage],
                    },
                },
            }
        );

        // ✅ Update receiver’s chatdata
        await User.updateOne(
            { username: receiver, "chatdata.friend": sender },
            { $push: { "chatdata.$.messages": newMessage } }
        );

        // if chat not exist, create it
        await User.updateOne(
            { username: receiver, "chatdata.friend": { $ne: sender } },
            {
                $push: {
                    chatdata: {
                        chatId,
                        friend: sender,
                        messages: [newMessage],
                    },
                },
            }
        );

        console.log("✅ Message stored inside chatdata for both users");

        return Response.json({ success: true, message: "Message sent" }, { status: 200 });
    } catch (err) {
        console.error("❌ Error sending message:", err);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
