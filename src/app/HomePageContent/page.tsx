"use client";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CancelIcon from '@mui/icons-material/Cancel';
import Badge from "@mui/material/Badge";
import Topbar from "../component/Topbar";
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatIcon from '@mui/icons-material/Chat';
import FriendListSkeleton from "../component/homeloading";
import { RootState as AppRootState } from "@/store";
import { SpeedDial, SpeedDialIcon } from '@mui/material';
import Blankchat from "../component/blankchats";

import { useRouter } from "next/navigation";
import {
    Avatar,

} from "@mui/material";
import NoRequestsPage from "../component/blankcrequest";

interface User {
    _id?: string;       // 👈 add this
    username?: string;
    fname?: string;
    email?: string;
    avatar?: string;
    profilePic?: string;
    isFriend?: boolean;
}
interface Friend {
    _id: string;
    username: string;
    fname: string,
    profilePic?: string;
    lastMessage?: string;
    lastMessageTime?: string;
}
interface HomePageContentProps {
    onFriendSelect: (friendName: string) => void;
    selectedFriend: string | null;
}

export default function HomePageContent({ onFriendSelect }: HomePageContentProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const user = useSelector((state: AppRootState) => state.user);
    const textColor = 'white'; // You can change this to any color you want
    const [users, setUsers] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [friendsList, setFriendsList] = useState<Friend[]>([]);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [tabValue, setTabValue] = useState(0);
    const loggeduser = user?.username ?? "";
    const [chatlist, setChatList] = useState<Friend[]>([]);
    const [hoveredUserId, setHoveredUserId] = useState<string | null>(null);
    const router = useRouter();
    const [reqdesable, setReqdesable] = useState(false);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };



    // -------------------- Use effects---

    useEffect(() => {
        if (!user?._id) return;

        const fetchChatList = async () => {
            try {
                const res = await fetch("/api/chat/list", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user._id }),
                });


                const data = await res.json();
                setChatList(data.chatList);
            } catch (error) {
                console.error("Error fetching chat list:", error);
            }
        };

        fetchChatList();
    }, [user]);





    useEffect(() => {
        if (!user) {
            console.log("User not ready...");
            return;
        }
        // console.log("User loaded:", user.username);
    }, [user]);


    useEffect(() => {
        if (!loggeduser) return;

        const fetchData = async () => {
            try {
                // Fetch friends first
                const friendsRes = await fetch(`/api/getFriends?username=${loggeduser}`);
                const friendsData = await friendsRes.json();
                const fetchedFriends = friendsData.friends || [];
                setFriends(fetchedFriends);
                setFriendsList(friendsData.friendslist || []);

                // Fetch all users
                const usersRes = await fetch("/api/userslist", { cache: "no-store" });
                const usersData = await usersRes.json();

                const filtered = usersData.filter((u: User) => u.username !== loggeduser);

                // ✅ Use freshly fetched friends array to mark isFriend
                const updatedUsers = filtered.map((u: User) => ({
                    ...u,
                    isFriend: fetchedFriends.some(
                        (f: User) => f._id === u._id || f.username === u.username
                    ),
                }));

                setUsers(updatedUsers);
                setAllUsers(updatedUsers);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [loggeduser]);


    // -------------------- HANDLERS --------------------
    const handleSearch = (value: string) => {
        setSearch(value);

        if (!value.trim()) {
            setAllUsers(users);

            return;
        }

        const filtered = users.filter((u) =>
            u.username?.toLowerCase().startsWith(value.toLowerCase())
        );

        setAllUsers(filtered);
    };

    const handleaddtochat = async (friend: User) => {
        console.log("⏳ handleaddtochat called", friend);

        try {
            const exists = chatlist.some((c) => c.username === friend.username);
            if (exists) {
                console.log("⚠ Already exists in state");
                return;
            }

            const res = await fetch("/api/chat/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user._id,

                    friend: friend,
                }),
            });

            console.log("📡 API Response Status:", res.status);

            if (!res.ok) throw new Error("Failed to add friend");



        } catch (error) {
            console.error("❌ Add Chat Error:", error);
        }
    };

    // 🔍 Search Icon Click → Go to Friends Tab
    const handleSearchIconClick = () => {
        setSearch("");
        setTabValue(1); // MOVE TO FRIENDS TAB
    };

    // -------------------- TABS SWITCH --------------------


    // -------------------- MESSAGE --------------------
    const handleMessage = (friendName: string) => {
        console.log("Messaging friend:", friendName);
        const userObject = allUsers.find(user => user.username === friendName);
        if (userObject) {
            handleaddtochat(userObject);
        } else {
            console.warn(`User ${friendName} not found in the local list. Cannot add to chat.`);
            // You might want to handle cases where a user isn't immediately found
        }

        onFriendSelect(friendName);
    };

    // -------------------- ACCEPT FRIEND --------------------
    const handleAccept = async (userObj: Friend) => {
        const res = await fetch("/api/friends", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                loggeduser,
                friendUsername: userObj.username
            })
        });

        const data = await res.json();
        alert(data.message || data.error);
    };

    // -------------------- SEND REQUEST --------------------
    const handleRequest = async (userObj: User) => {

        setReqdesable(true);
        const res = await fetch("/api/addFriend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                loggeduser,
                friendUsername: userObj.username
            })
        });

        setReqdesable(false);

        const data = await res.json();
        alert(data.message || data.error);
    };


















    // -------------------- SAFE RETURN --------------------
    if (!user || !user.username) {
        router.push("/");
    }
    if (loading) return <FriendListSkeleton />;
    // const [tabLabel, setTabLabel] = useState("Home");
    return (
        < >

            <div className="modal fade" id="exampleModal" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen-sm-down modal-lg">
                    <div className="modal-content w-100">
                        <div className="modal-header">
                            <h5 className="modal-title">Your Friends</h5>

                            <button
                                type="button"
                                className="btn btn-danger ms-auto"
                                data-bs-dismiss="modal"
                            >

                                <CancelIcon />
                            </button>
                        </div>

                        <div className="modal-body p-0">
                            <Typography style={{ backgroundColor: '#f0fdf0' }}>
                                {friends.length === 0 ? (
                                    <p className="text-center text-muted m-3">No friends yet...</p>
                                ) : (
                                    <ul className="list-unstyled m-0 p-0 w-100">
                                        {friends.map((friend, idx) => (
                                            <li
                                                key={idx}
                                                className="d-flex align-items-center justify-content-between p-2 mb-2"
                                                style={{
                                                    cursor: "pointer",
                                                    transition: "0.2s",
                                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                                }}
                                                onClick={() => handleMessage(friend.username)}
                                            >
                                                <Avatar src={friend.profilePic} alt={friend.fname} sx={{ ml: 2 }} />

                                                <div className="flex-grow-1 ms-3">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-0 fw-bold">{friend.username}</p>
                                                        <small className="text-muted">{friend.lastMessageTime}</small>
                                                    </div>
                                                </div>

                                                {/* Add to chat button (Right side) */}
                                                <button
                                                    className="btn btn-sm"
                                                    style={{
                                                        backgroundColor: "#e6f7e6",   // light green background
                                                        color: "#0a8a0a",             // dark green text
                                                        borderRadius: "20px",
                                                        padding: "5px 12px",
                                                        border: "1px solid #0a8a0a",
                                                        fontWeight: "500",
                                                        whiteSpace: "nowrap"
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // stops triggering parent onClick
                                                        handleaddtochat(friend);
                                                    }}
                                                >
                                                    Add to Chat
                                                </button>
                                            </li>

                                        ))}
                                    </ul>
                                )}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>




            <Topbar
                user={{
                    fname: user.fname ?? "No Name",
                    profilePic: user.profilePic ?? "/default-avatar.png",
                    username: user.username ?? "",

                }}
                isHome={true}
                onSearchClick={handleSearchIconClick}
            />

            {/* ------------------- TABS ------------------- */}
            <Tabs
                value={tabValue}
                onChange={handleChange}
                sx={{
                    minHeight: "60px",
                    position: "sticky",
                    top: 60,
                    bgcolor: "#f0fdf0",
                    zIndex: 1000,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",

                    "& .MuiTab-root": {
                        fontWeight: 500,
                        fontSize: "1.1rem",
                        minHeight: "20px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        borderRadius: "30px",
                        transition: "transform 0.1s ease-out, background-color 0.2s ease",
                        transform: "scale(1)",
                        color: "gray",

                    },

                    "& .MuiTab-root:hover": {
                        backgroundColor: "#b5f2c5ff",
                        transform: "scale(0.95)",

                    },


                    "& .MuiTab-root:active": {
                        transform: "scale(0.90)",
                    },

                    "& .Mui-selected": {
                        color: "black !important",
                        backgroundColor: "#46ec72ff",
                        fontWeight: "bold !important",
                        transform: "scale(1.08)",


                    },

                    "& .MuiTabs-indicator": {
                        display: "none",
                    },
                }}
            >

                <Tab label="Chats" sx={{
                    transform: "smooth",
                    fontWeight: "bold !important",
                    border: "solid 1px gray",
                    margin: "10px",
                    textTransform: "none",
                    backgroundColor: '#f0fdf0'

                }} />
                <Tab label="Search" sx={{
                    transform: "smooth",
                    fontWeight: "bold !important",
                    border: "solid 1px gray",
                    margin: "10px",
                    textTransform: "none",
                    backgroundColor: '#f0fdf0'

                }} />



                <Tab
                    label={
                        <Badge
                            badgeContent={friendsList.length}       // your dynamic number
                            color="error"
                            sx={{ "& .MuiBadge-badge": { fontSize: "0.7rem" } }}
                        >
                            Requests
                        </Badge>
                    }
                    sx={{

                        transform: "smooth",
                        border: "solid 1px gray",
                        fontWeight: "bold !important",
                        margin: "10px",
                        textTransform: "none"
                    }}
                />

            </Tabs>

            <hr className="mb-0 mt-0"></hr>
            {/* ------------------- CONTENT ------------------- */}
            <Box sx={{ height: "calc(100vh - 140px)", overflowY: "auto", backgroundColor: '#f0fdf0' }}>

                {/* ⭐ Chats Tab */}
                {tabValue === 0 && (

                    <Typography >


                        {chatlist.length === 0 ? (
                            <div>
                                <Blankchat />
                                <SpeedDial
                                    //    onClick={openaddmodel}
                                    ariaLabel="SpeedDial example"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    sx={{ position: 'fixed', bottom: 40, left: 400 }}
                                    icon={<SpeedDialIcon />}
                                ></SpeedDial>
                            </div>

                        ) : (
                            <div>

                                <ul className="list-unstyled mt-1">
                                    {[...chatlist].reverse().map((friend, idx) => (
                                        <li
                                            key={idx}
                                            className="d-flex align-items-center justify-content-between p-1"
                                            style={{
                                                cursor: "pointer",
                                                transition: "background-color 0.2s",
                                                borderRadius: "10px",
                                                // Check if the current item index matches the hovered index
                                                backgroundColor: hoveredIndex === idx ? '#9ce9b2ff' : '#f0fdf0',
                                            }}
                                            onClick={() => handleMessage(friend.username)}
                                            // Add event handlers to update the hovered index state
                                            onMouseEnter={() => setHoveredIndex(idx)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            {/* Profile Image */}
                                            <div className="me-3">
                                                <Avatar
                                                    src={friend.profilePic}
                                                    alt={friend.fname}
                                                    sx={{ ml: 2 }}
                                                />
                                            </div>

                                            {/* Name & Latest Message */}
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="mb-0 fw-bold" style={{ color: "black" }}>{friend.username}</p>
                                                    <small style={{ color: textColor }}>{friend.lastMessageTime}</small>
                                                </div>
                                                <p className="mb-0 text-truncate text-primary" style={{ maxWidth: "200px" }}>
                                                    {friend.lastMessage || "last message!"}
                                                </p>
                                            </div>
                                        </li>


                                    ))}

                                </ul>
                                <SpeedDial
                                    //    onClick={openaddmodel}
                                    ariaLabel="SpeedDial example"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    sx={{ position: 'fixed', bottom: 40, left: 400 }}
                                    icon={<SpeedDialIcon />}
                                ></SpeedDial>
                            </div>

                        )}
                    </Typography>


                )}

                {/* ⭐ Friends Tab */}
                {tabValue === 1 && (

                    < Typography  >
                        <InputGroup className="  ">
                            <Form.Control
                                style={{
                                    border: "1px solid gray",
                                    padding: "7px",
                                    margin: "5px",
                                    backgroundColor: "#f6fff6",
                                    borderRadius: "20px",
                                    fontSize: "1.3rem",

                                }}
                                placeholder="Search friends"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </InputGroup>

                        {allUsers.length === 0 ? (
                            <p>No users found...</p>
                        ) : (
                            <ul className="list-unstyled">
                                {allUsers.map((u) => (
                                    <li
                                        key={u._id} // Use the unique ID as the key for tracking hover state
                                        className="p-2 rounded d-flex align-items-center justify-content-between"
                                        style={{
                                            cursor: "pointer",
                                            transition: "background-color 0.2s",
                                            // Set background color dynamically to light gray #e9ecef on hover
                                            backgroundColor: hoveredUserId === u._id ? '#9ce9b2ff' : '#f0fdf0', // Or a neutral gray #f8f9fa
                                        }}
                                        onMouseEnter={() => setHoveredUserId(u._id || null)}
                                        onMouseLeave={() => setHoveredUserId(null)}
                                    >
                                        {/* Left: Avatar and User Info */}
                                        <div className="d-flex align-items-center">
                                            <Avatar
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    marginRight: "15px",
                                                    bgcolor: "#1976d2",
                                                    fontSize: "2rem",
                                                    fontWeight: "bold",
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                {u.username?.charAt(0)}
                                            </Avatar>

                                            <div className="d-flex flex-column">
                                                <span className="fw-bold text-black bold">{u.fname}</span>
                                                <small className="text-gray ">@{u.username}</small>
                                            </div>
                                        </div>

                                        {/* Right: Conditional Button */}
                                        {u.isFriend ? (
                                            <Button
                                                size="sm"
                                                variant="outline-success"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevents li onClick from firing
                                                    handleMessage(u.username ?? "");
                                                }}
                                            >
                                                <ChatIcon />
                                            </Button>
                                        ) : (
                                            <Button
                                                disabled={reqdesable}
                                                size="sm"
                                                variant="outline-success"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevents li onClick from firing
                                                    handleRequest(u);
                                                }}
                                            > <PersonAddIcon />

                                            </Button>
                                        )}
                                    </li>



                                ))}
                            </ul>
                        )}
                    </Typography>
                )}

                {/* ⭐ Requests Tab */}
                {tabValue === 2 && (
                    <Typography>
                        {friendsList.length === 0 ? (
                            <NoRequestsPage />
                        ) : (
                            <ul className="list-unstyled">
                                {friendsList.map((friend, idx) => (
                                    <li
                                        key={idx}
                                        className="p-2 bg-gray-100 mb-2 rounded shadow-sm"
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="w-8 h-8 bg-primary rounded-circle text-white d-flex justify-content-center align-items-center" style={{
                                                fontSize: "1.5rem",
                                                width: "40px",
                                                height: "40px",
                                            }}>
                                                {friend.username.charAt(0)}
                                            </div>

                                            <p className="mb-0 fw-bold background: #e2e4eeff">{friend.username}</p>
                                            <div>
                                                <Button
                                                    size="sm"
                                                    style={{ marginRight: "10px" }}
                                                    variant="danger"
                                                    onClick={() => handleAccept(friend)}
                                                >
                                                    Reject

                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="success"
                                                    onClick={() => handleAccept(friend)}
                                                >
                                                    Accept

                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Typography>
                )}

            </Box >
        </>
    );
}
