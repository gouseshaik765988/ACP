import connectMongo from "@/lib/connectMongo";
import Userslist from "@/models/Userslist";

export async function POST(req) {
    try {
        await connectMongo();

        const { firstName, lastName, age, username, password } = await req.json();

        const fullName = `${firstName} ${lastName}`;

        // ✅ Check if username already exists
        const existingUser = await Userslist.findOne({ username });
        if (existingUser) {
            return Response.json(
                { error: "Username already exists" },
                { status: 400 }
            );
        }

        // ✅ Create new user
        await Userslist.create({
            firstName,
            lastName,
            age,
            fullName,
            username,
            password,
            friendsList: [], // optional: predefine empty friends array
        });

        return Response.json({
            success: true,
            message: `User ${fullName} created successfully!`,
        });
    } catch (error) {
        console.error("❌ Signup Error:", error);
        return Response.json({ error: "Signup failed" }, { status: 500 });
    }
}
