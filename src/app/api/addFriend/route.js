import connectMongo from "@/lib/connectMongo";
import Userslist from "@/models/Userslist";

export async function POST(req) {
    try {
        await connectMongo();

        const { loggeduser, friendUsername } = await req.json();

        if (!loggeduser || !friendUsername) {
            return Response.json({ error: "Missing data" }, { status: 400 });
        }

        // 🔹 Find the receiver (friend) — B
        const receiver = await Userslist.findOne({ username: friendUsername });
        if (!receiver) {
            return Response.json({ error: "Friend user not found" }, { status: 404 });
        }

        // 🔹 Ensure B has a friendsList array (for safety)
        if (!receiver.friendsList) receiver.friendsList = [];

        // 🔹 Check if A already exists in B’s friendsList
        const alreadyAdded = receiver.friendsList.some(
            (f) => f.username === loggeduser
        );
        if (alreadyAdded) {
            return Response.json(
                { error: "Already requested or added" },
                { status: 409 }
            );
        }

        // 🔹 Add A to B’s friendsList
        receiver.friendsList.push({ username: loggeduser });
        await receiver.save();

        return Response.json({
            success: true,
            message: `✅ Friend request sent to ${friendUsername}`,
        });


    } catch (err) {
        console.error("❌ Error adding friend:", err);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
