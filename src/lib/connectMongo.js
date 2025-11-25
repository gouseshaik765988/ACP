// src/lib/connectMongo.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "❌ Missing MONGODB_URI environment variable in Vercel settings!"
    );
}

// Use global to cache connection across hot reloads
if (!global._mongo) {
    global._mongo = { conn: null, promise: null };
}

async function connectMongo() {
    if (global._mongo.conn) {
        console.log("✅ Using existing MongoDB connection");
        return global._mongo.conn;
    }

    if (!global._mongo.promise) {
        const opts = {
            dbName: "DEMO", // optional DB name
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        global._mongo.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
            console.log("✅ MongoDB Connected Successfully:", m.connection.host);
            return m;
        });
    }

    global._mongo.conn = await global._mongo.promise;
    return global._mongo.conn;
}

export default connectMongo;
