import connectMongo from "@/lib/connectMongo";
import Userslist from "@/models/Userslist";

export async function GET(req) {
    try {

        await connectMongo();

        const { searchParams } = new URL(req.url);
        const username = searchParams.get("username");

        if (!username) {
            return Response.json({ error: "Missing username" }, { status: 400 });
        }

        const user = await Userslist.findOne({ username });
        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        return Response.json({
            friendslist: user.friendsList || [],
            friends: user.friends || [],
        });


    } catch (err) {
        console.error("Error fetching friends:", err);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
