import connectMongo from "@/lib/connectMongo";
import Userslist from "@/models/Userslist";

export async function POST(req) {
    try {
        await connectMongo();

        const { loggeduser, friendUsername } = await req.json();

        if (!loggeduser || !friendUsername) {
            return Response.json({ error: "Missing data" }, { status: 400 });
        }

        // Find receiver (friend B)
        const receiver = await Userslist.findOne({ username: friendUsername });
        if (!receiver) {
            return Response.json({ error: "Friend user not found" }, { status: 404 });
        }

        // Find sender (logged user A)
        const sender = await Userslist.findOne({ username: loggeduser });
        if (!sender) {
            return Response.json({ error: "Sender user not found" }, { status: 404 });
        }

        // Ensure both have arrays
        if (!receiver.friends) receiver.friends = [];
        if (!receiver.friendsList) receiver.friendsList = [];
        if (!sender.friends) sender.friends = [];
        if (!sender.friendsList) sender.friendsList = [];

        // Check if already friends
        const alreadyAdded = receiver.friends.some(
            (f) => f.username === loggeduser
        );
        if (alreadyAdded) {
            return Response.json({ error: "Already Friends" }, { status: 409 });
        }

        // ✅ Add each other to friends
        receiver.friends.push({ username: loggeduser });
        sender.friends.push({ username: friendUsername });

        // ✅ Remove from pending lists
        receiver.friendsList = receiver.friendsList.filter(
            (f) => f.username !== loggeduser
        );
        sender.friendsList = sender.friendsList.filter(
            (f) => f.username !== friendUsername
        );

        // ✅ Save both users
        await receiver.save();
        await sender.save();

        return Response.json({
            success: true,
            message: `✅ ${loggeduser} and ${friendUsername} are now friends!`,
        });

    } catch (err) {
        console.error("❌ Error adding friend:", err);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
