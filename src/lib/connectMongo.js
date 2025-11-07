


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("❌ Missing MONGODB_URI environment variable in Vercel settings!");
}

let isConnected = false; // global connection flag

export default async function connectDB() {
    if (isConnected) {
        console.log("✅ Using existing MongoDB connection");
        return;
    }

    try {
        const conn = await mongoose.connect(MONGODB_URI, {
            dbName: "ACPDB", // your database name (optional, or include in URI)
        });

        isConnected = true;
        console.log("✅ MongoDB Connected Successfully:", conn.connection.host);
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        throw err;
    }
}
