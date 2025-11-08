import connectMongo from "@/lib/connectMongo";
import Userslist from "@/models/Userslist";

export async function POST(req) {
    try {
        await connectMongo();

        const { username, password } = await req.json();

        // ✅ Find user
        const user = await Userslist.findOne({ username });

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        // ✅ Check password
        if (user.password !== password) {
            return Response.json({ error: "Incorrect password" }, { status: 401 });
        }

        // ✅ Success response
        return Response.json({
            success: true,
            message: "Login successful",
            user: {

                username: user.username,
            },
        },

        );
    } catch (err) {
        console.error("❌ Login Error:", err);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
