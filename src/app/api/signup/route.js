import connectMongo from "@/lib/connectMongo";
import Userslist from "@/models/Userslist";

export async function POST(req) {
    try {
        await connectMongo();

        const { fname, lname, email, username, password } = await req.json();


        const fullName = `${fname} ${lname}`;

        const existingUser = await Userslist.findOne({ username });
        if (existingUser) {
            return Response.json(
                { error: "Username already exists" },
                { status: 400 }
            );
        }

        await Userslist.create({
            fname,
            lname,
            email,
            username,
            fullName,
            password,
        });

        return Response.json({
            success: true,
            message: `User ${fullName} created successfully!`,
        });
    } catch (error) {
        console.error("❌ Signup API Error:", error);
        return Response.json({ error: "Signup failed" }, { status: 500 });
    }
}
