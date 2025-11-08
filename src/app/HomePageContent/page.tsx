"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Type definitions
interface User {
    _id: string;
    username: string;
    fullName?: string;
}

interface Friend {
    username: string;
}

// ✅ Inner component that uses useSearchParams()
function HomePageInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const loggeduser = searchParams.get("username");
    // const name = searchParams.get("fullname");

    const [users, setUsers] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [friendsList, setFriendsList] = useState<Friend[]>([]);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [value, setValue] = useState<number>(0);

    const handleChange = (_event: React.SyntheticEvent | Event, newValue: number) => {
        setValue(newValue);
    };

    // ✅ Fetch all users every 1 second
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/userslist", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to fetch users");
                const data: User[] = await res.json();
                const filteredUsers = data.filter(user => user.username !== loggeduser);
                setUsers(filteredUsers);
                // setAllUsers(filteredUsers);
            } catch (err) {
                console.error("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
        const interval = setInterval(fetchUsers, 1000);
        return () => clearInterval(interval);
    }, [loggeduser]);

    // ✅ Fetch logged user’s friends list every 1 second
    useEffect(() => {
        if (!loggeduser) return;

        const fetchFriends = async () => {
            try {
                const res = await fetch(`/api/getFriends?username=${loggeduser}`);
                if (!res.ok) throw new Error("Failed to fetch friends");
                const data = await res.json();
                setFriendsList(data.friendslist || []);
                setFriends(data.friends || []);
            } catch (err) {
                console.error("Error fetching friends:", err);
            }
        };

        fetchFriends();
        const interval = setInterval(fetchFriends, 1000);
        return () => clearInterval(interval);
    }, [loggeduser]);

    // ✅ Go to chat page
    const handleMessage = (friendUsername: string) => {
        router.push(`/chat?user=${loggeduser}&friend=${friendUsername}`);
    };

    // ✅ Search users
    const handleSearch = (value: string) => {
        setSearch(value);
        if (!value.trim()) {
            setUsers(users);
            return;
        }
        const filtered = users.filter((user) =>
            (user.fullName || "").toLowerCase().startsWith(value.toLowerCase())
        );
        setAllUsers(filtered);
    };

    // ✅ Accept friend request
    const handleAccept = async (user: Friend) => {
        try {
            const res = await fetch("/api/friends", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    loggeduser,
                    friendUsername: user.username,
                }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                window.alert(data.message);
            } else {
                window.alert(data.error || "Failed to send request");
            }
        } catch (err) {
            console.error(err);
            window.alert("Something went wrong");
        }
    };

    // ✅ Send friend request
    const handleRequest = async (user: User) => {
        try {
            const res = await fetch("/api/addFriend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    loggeduser,
                    friendUsername: user.username,
                }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                window.alert(data.message);
            } else {
                window.alert(data.error || "Failed to send request");
            }
        } catch (err) {
            console.error(err);
            window.alert("Something went wrong");
        }
    };

    if (loading) return <p className="p-6">Loading users...</p>;

    return (

        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                alignItems: "center",
                bgcolor: "#ffffffff",
            }}
        >
            <Box
                sx={{
                    bgcolor: "#f2eef4ff",
                    height: "100vh",

                    boxShadow: 3,
                    borderRadius: 2,
                    p: 1,
                    minWidth: 300,
                    textAlign: "center",
                }}
            >
                <div className="mt-2 d-flex align-items-center justify-content-between">
                    <button
                        className="btn btn-white"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasExample"
                        aria-controls="offcanvasExample"
                    >
                        =
                    </button>

                    <h5 className="mb-0 ms-3">Hi! {loggeduser ? loggeduser : "Guest"}</h5>
                </div>


                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="Friends" />
                    <Tab label="Search" />
                    <Tab label="Notifications" />
                </Tabs>
                <hr className="mb-1 mt-0"></hr>
                <Box sx={{ mt: 0 }}>
                    {value === 0 && (
                        <Typography>
                            <h6 className="text-center "></h6>
                            {friends.length === 0 ? (
                                <p>No friends yet...</p>
                            ) : (
                                <ul className="list-unstyled w-100">
                                    {friends.map((friend, idx) => (
                                        <li
                                            key={idx}
                                            className="w-100 p-2 border rounded-lg shadow-sm bg-gray-100 mb-2"
                                        >
                                            <div className="d-flex justify-content-between align-items-center w-100">
                                                <div className="   w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-1 font-bold shadow-lg">
                                                    {friend.username?.charAt(0)}
                                                </div>
                                                <p className="mb-0 fw-bold">{friend.username}</p>
                                                <Button
                                                    variant="success"
                                                    size="sm"
                                                    onClick={() => handleMessage(friend.username)}
                                                >
                                                    Message
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Typography>
                    )}

                    {value === 1 && (
                        <Typography>
                            <div className="  ">
                                <div className="mx-auto" style={{ maxWidth: "600px" }}>
                                    <InputGroup className="mb-1 w-100">
                                        <Form.Control
                                            placeholder="Search friends"

                                            value={search}
                                            onChange={(e) => handleSearch(e.target.value)}
                                        />
                                    </InputGroup>

                                    {allUsers.length === 0 ? (
                                        <p>No users found...</p>
                                    ) : (
                                        <ul className="list-unstyled w-100">
                                            {allUsers.map((user) => (

                                                <li
                                                    key={user._id}
                                                    className="w-100 p-2   shadow-sm bg-gray-100 mb-0.5"
                                                >
                                                    <div className="d-flex justify-content-between align-items-center w-100">
                                                        <div className="   w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-1 font-bold shadow-lg">
                                                            {user.username?.charAt(0)}
                                                        </div>
                                                        <p className="mb-0 fw-bold">{user.username}</p>
                                                        <Button
                                                            variant="primary"
                                                            size="sm"
                                                            onClick={() => handleRequest(user)}
                                                        >
                                                            Request
                                                        </Button>
                                                    </div>

                                                </li>

                                            ))}
                                        </ul>

                                    )}

                                </div>
                            </div>
                        </Typography>
                    )}

                    {value === 2 && (
                        <Typography>
                            <h6 className="text-center mb-3"> </h6>
                            {friendsList.length === 0 ? (
                                <p>No requests yet...</p>
                            ) : (
                                <ul className="list-unstyled w-100">
                                    {friendsList.map((friend, idx) => (
                                        <li
                                            key={idx}
                                            className="w-100 p-2 border rounded-lg shadow-sm bg-gray-100 mb-0"
                                        >
                                            <div className="d-flex justify-content-between align-items-center w-100 ">
                                                <div className="   w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-1 font-bold shadow-lg">
                                                    {friend.username?.charAt(0)}
                                                </div>
                                                <p className="mb-0 fw-bold">{friend.username}</p>
                                                <Button
                                                    variant="success"
                                                    size="sm"
                                                    onClick={() => handleAccept(friend)}
                                                >
                                                    Accept
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

// ✅ Wrapper with Suspense
export default function HomePageContent() {
    return (
        <Suspense fallback={<div className="p-4 text-center">Loading page...</div>}>
            <HomePageInner />
        </Suspense>
    );
}

// ✅ Prevent caching / prerendering
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
