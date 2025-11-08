import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    content: String,
    timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
    chatId: { type: String, required: true },
    friend: { type: String, required: true },
    messages: [messageSchema], // ✅ messages stored inside chat
});

const userslistSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    friendsList: [
        {
            username: String,
            addedAt: { type: Date, default: Date.now },
        },
    ],

    friends: [
        {
            username: String,
            addedAt: { type: Date, default: Date.now },
        },
    ],

    chatdata: [chatSchema], // ✅ embed chat with messages
});

export default mongoose.models.Userslist ||
    mongoose.model("Userslist", userslistSchema, "userslist");
