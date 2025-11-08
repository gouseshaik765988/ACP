"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import React, { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

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
    const [viewportHeight, setViewportHeight] = useState("100vh");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // ✅ Adjust viewport height when keyboard opens (mobile)
    useEffect(() => {
        const handleResize = () => {
            const vh = window.visualViewport
                ? window.visualViewport.height * 0.5
                : window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
            // setViewportHeight(`calc(var(--vh, 1vh) * 100)`);
        };
        handleResize();

        window.addEventListener("resize", handleResize);
        window.visualViewport?.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.visualViewport?.removeEventListener("resize", handleResize);
        };
    }, []);

    // ✅ Prevent entire body scroll when keyboard opens
    useEffect(() => {
        const handleFocus = () => (document.body.style.overflow = "hidden");
        const handleBlur = () => (document.body.style.overflow = "");
        window.addEventListener("focusin", handleFocus);
        window.addEventListener("focusout", handleBlur);
        return () => {
            window.removeEventListener("focusin", handleFocus);
            window.removeEventListener("focusout", handleBlur);
        };
    }, []);

    // ✅ Fetch messages
    useEffect(() => {
        if (!loggeduser || !friend) return;

        const fetchMessages = async () => {
            try {
                const res = await fetch(
                    `/api/getMessage?user=${loggeduser}&friend=${friend}`,
                    { cache: "no-store" }
                );
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
                setMessages((prev) => [
                    ...prev,
                    {
                        sender: loggeduser!,
                        receiver: friend!,
                        content: newMessage,
                        timestamp: new Date().toISOString(),
                    },
                ]);
                setNewMessage("");
                inputRef.current?.focus();
            } else {
                alert(data.error || "Failed to send message");
            }
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    // ✅ Scroll to bottom when new messages arrive
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div
            className="flex flex-col bg-gray-100"
            style={{
                height: viewportHeight,
                position: "fixed",
                inset: 0,
                overflow: "hidden",

            }}
        >
            {/* ✅ Fixed Navbar */}



            <div
                className="fixed top-0 left-0 right-0 backdrop-blur-md bg-black-800/10 text-black text-start py-2 shadow-lg z-20 border-b border-purple-400/300"
            >
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold truncate px-4 tracking-wide">
                    {friend || "Chat"}
                </h2>
            </div>
            <div className="   w-48 h-13 bg-gradient-to-r from-blue-500 to-purple-200 rounded-full flex items-center justify-center text-white text-1 font-bold shadow-lg">

            </div>


            {/* ✅ Scrollable Chat Area */}
            <div
                className="flex-1 overflow-y-auto px-3 pt-16 pb-24 "
                style={{
                    height: "calc(var(--vh, 1vh) * 100 - 120px)",
                    scrollBehavior: "smooth",
                }}
            >
                {messages.length === 0 ? (
                    <p className="text-center text-gray-500  mt-10">No messages yet</p>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex mb-1 ${msg.sender === loggeduser
                                ? "justify-end"
                                : "justify-start"
                                }`}
                        >
                            <div
                                className={`flex items-center gap-2 p-1 rounded-lg max-w-xs ${msg.sender === loggeduser
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 text-black"
                                    }`}
                            >
                                <span>{msg.content}</span>
                                <Dropdown
                                    align={msg.sender === loggeduser ? "end" : "start"}
                                    drop="up-centered"
                                >
                                    <Dropdown.Toggle variant="white" size="sm"></Dropdown.Toggle>
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
                <div ref={messagesEndRef} />
            </div>

            {/* ✅ Fixed Input Bar */}
            <div
                className="fixed left-0 right-0 flex items-center p-0 bg-white shadow-lg z-20 transition-all duration-200"
                style={{
                    bottom: 1,
                    paddingBottom: "calc(env(safe-area-inset-bottom) + 8px)",
                }}
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className=" container flex-1 border rounded-lg px-3 py-2 mr-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={sendMessage}
                    className="   bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 shadow-md active:scale-95 flex items-center justify-center transition-transform duration-150"
                >
                    <SendRoundedIcon className="text-white" />
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
