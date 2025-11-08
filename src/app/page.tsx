"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                const encodedUsername = encodeURIComponent(data.user.username);
                router.push(`/home?username=${encodedUsername}`);
            } else {
                setMessage(`❌ ${data.error || "Login failed"}`);
            }
        } catch (err) {
            console.error("❌ Login error:", err);
            setMessage("❌ Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-200">
                {/* Logo / Header */}
                <div className="text-center mb-6">
                    <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        ACP
                    </div>

                    <p className="text-sm text-gray-500 mt-1 tracking-wide">
                        (Afreen’s Chat Pro)
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition-all"
                    >
                        Login
                    </button>
                    <p className="text-center text-gray-600 text-sm mt-6">
                        Don’t have an account?{" "}
                        <a
                            href="/signup"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Sign up
                        </a>
                    </p>
                </form>

                {message && (
                    <p className="mt-4 text-center text-red-600 font-medium">{message}</p>
                )}


            </div>
        </div>
    );
}
