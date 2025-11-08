import connectMongo from "@/lib/connectMongo";
import Userslist from "@/models/Userslist";

export async function POST(req) {
    try {
        await connectMongo();


        const { username } = await req.json();

        if (!username) {
            return Response.json({ error: "Username missing" }, { status: 400 });
        }

        // Find the user by username
        const user = await Userslist.findOne({ username }).lean();

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }




        return Response.json({ success: true, user: safeUser });
    } catch (err) {
        console.error("❌ Fetch User Error:", err);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
