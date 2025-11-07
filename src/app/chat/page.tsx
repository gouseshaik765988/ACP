"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import React, { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type Message = {
    sender: string;
    receiver: string;
    content: string;
    timestamp?: string;
};

function ChatPageContent() {
    const searchParams = useSearchParams();
    const loggeduser = searchParams.get("user");
    const friend = searchParams.get("friend");

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");

    // ✅ Ref for auto-scroll
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // ✅ Auto-scroll whenever messages update
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // ✅ Fetch messages
    useEffect(() => {
        if (!loggeduser || !friend) return;

        const fetchMessages = async () => {
            try {
                const res = await fetch(`/api/getMessage?user=${loggeduser}&friend=${friend}`, {
                    cache: "no-store",
                });
                if (!res.ok) throw new Error("Failed to fetch messages");
                const data = await res.json();
                setMessages(data.messages || []);
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 1000);
        return () => clearInterval(interval);
    }, [loggeduser, friend]);

    // ✅ Send message
    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const res = await fetch("/api/sendMessage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sender: loggeduser,
                    receiver: friend,
                    content: newMessage,
                }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setNewMessage("");
                setMessages((prev) => [
                    ...prev,
                    {
                        sender: loggeduser!,
                        receiver: friend!,
                        content: newMessage,
                        timestamp: new Date().toISOString(),
                    },
                ]);
            } else {
                alert(data.error || "Failed to send message");
            }
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-blue-600 text-white text-center py-3 shadow-md">
                <h2>{friend}</h2>
            </div>

            {/* Messages Section */}
            <div className="flex-1 overflow-y-auto p-4">
                {messages.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">No messages yet</p>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex mb-2 ${msg.sender === loggeduser ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`flex items-center gap-2 p-2 rounded-lg max-w-xs ${msg.sender === loggeduser
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 text-black"
                                    }`}
                            >
                                {/* Message Text */}
                                <span>{msg.content}</span>

                                {/* Dropdown beside message */}
                                <Dropdown align={msg.sender === loggeduser ? "end" : "start"}>
                                    <Dropdown.Toggle
                                        variant="white"
                                    >

                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => alert("Delete message")}>
                                            Delete
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => alert("Forward message")}>
                                            Forward
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => alert("Info")}>
                                            Info
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    ))
                )}

                {/* Invisible div for auto-scroll */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="flex items-center p-3 bg-white shadow-lg">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 border rounded-lg px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div className="p-4 text-center">Loading chat...</div>}>
            <ChatPageContent />
        </Suspense>
    );
}
