import connectMongo from "@/lib/connectMongo";
import Userslist from "@/models/Userslist";

export async function POST(req) {
    try {
        // Connect inside function
        await connectMongo();

        const { loggeduser, friendUsername } = await req.json();

        if (!loggeduser || !friendUsername) {
            return Response.json({ error: "Missing data" }, { status: 400 });
        }

        const receiver = await Userslist.findOne({ username: friendUsername });
        if (!receiver) {
            return Response.json({ error: "Friend user not found" }, { status: 404 });
        }

        receiver.friendsList = receiver.friendsList || [];

        const alreadyAdded = receiver.friendsList.some(
            (f) => f.username === loggeduser
        );

        if (alreadyAdded) {
            return Response.json(
                { error: "Already requested or added" },
                { status: 409 }
            );
        }

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
