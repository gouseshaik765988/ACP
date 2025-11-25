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
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    profilePic: {
        type: String,   // Secure URL from Cloudinary
        default: "https://res.cloudinary.com/dx6h8z8nz/image/upload/v1763136229/samples/zoom.avif",    // Empty until user uploads
    },

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

    chatList: [
        {
            username: String,
            addedAt: { type: Date, default: Date.now },
        },
    ],
});

export default mongoose.models.Userslist ||
    mongoose.model("Userslist", userslistSchema, "userslist");