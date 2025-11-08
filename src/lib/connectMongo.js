import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "❌ Missing MONGODB_URI environment variable in Vercel settings!"
    );
}

// Use global to persist connection across hot reloads and serverless functions
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectMongo() {
    if (cached.conn) {
        console.log("✅ Using existing MongoDB connection");
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            dbName: "ACPDB", // Optional: your DB name
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("✅ MongoDB Connected Successfully:", mongoose.connection.host);
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
