"use client";
import { FormEvent } from "react";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TextField, Button, Box, Typography, Card, CardContent } from "@mui/material";
import Spinner from 'react-bootstrap/Spinner';

// Icons for background
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

// Clerk
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Redux
import { useDispatch } from "react-redux";
import { setUser as setReduxUser } from "../store/userSlice";

export default function LoginPage() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const { isSignedIn } = useAuth();
    const router = useRouter();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [disable, setDisable] = useState(false);

    // 👉 If already logged in redirect to /home

    useEffect(() => {
        if (!isLoaded) return;   // wait for Clerk
        if (isSignedIn) router.replace("/home");  // no flicker, no loop
    }, [isLoaded, isSignedIn, router]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // ... (handleSubmit logic remains the same) ...
        if (!isLoaded) return;
        setDisable(true);
        try {
            const result = await signIn.create({
                identifier: email,
                password: password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });

                const res = await fetch("/api/get-user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: email }),
                });

                const data = await res.json();
                if (data.user) {
                    dispatch(setReduxUser(data.user));
                }

                router.push("/home");
            }
        } catch (err: unknown) {
            // Type guard to check if err has 'errors' array
            if (err && typeof err === "object" && "errors" in err) {
                const e = err as { errors: { code: string; message: string }[] };
                const code = e.errors?.[0]?.code;

                if (code === "identifier_not_found") setMessage("User not found.");
                else if (code === "invalid_credentials") setMessage("Incorrect password.");
                else setMessage(e.errors?.[0]?.message || "Login failed. Try again.");
                setDisable(false);
            } else {
                setMessage("Login failed. Try again.");
            }
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: "100vh",
                backgroundColor: "#85d185ff", // Light green background
                position: 'relative', // Set relative positioning for children absolute positioning
                overflow: 'hidden' // Hide overflow from background bubbles
            }}
        >

            {/* --- START: Background Decorative Elements (Bubbles and Icons) --- */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.4 }}>
                {/* Large Chat Bubbles */}
                <div style={{ position: 'absolute', top: '10%', left: '15%', transform: 'scale(2.5)', color: '#d0f0c0' }}>
                    <ChatBubbleOutlineIcon style={{ fontSize: '100px' }} />
                </div>
                <div style={{ position: 'absolute', bottom: '15%', right: '10%', transform: 'scale(3)', color: '#d0f0c0' }}>
                    <MessageOutlinedIcon style={{ fontSize: '100px' }} />
                </div>

                {/* Smaller, lighter bubbles */}
                <div style={{ position: 'absolute', top: '40%', right: '30%', width: '30px', height: '30px', backgroundColor: '#e9f5e9', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '30%', left: '25%', width: '50px', height: '50px', backgroundColor: '#e9f5e9', borderRadius: '50%' }}></div>

                {/* Add Friend Icon */}
                <div style={{ position: 'absolute', top: '65%', left: '10%', transform: 'scale(1.5)', color: '#c5e3b5' }}>
                    <PersonAddAltOutlinedIcon style={{ fontSize: '80px' }} />
                </div>
            </div>
            {/* --- END: Background Decorative Elements --- */}


            {/* --- START: Login Card (Ensure it's above the background using zIndex) --- */}
            <Card style={{
                width: "400px",
                overflow: "hidden",
                // border: "1px solid #000000ff",
                borderRadius: "15px",
                position: 'relative',
                zIndex: 10,
                // Add a semi-transparent background to the card itself
                backgroundColor: "transparent"
            }}>
                {/* Change CardContent background to transparent */}
                <CardContent style={{ backgroundColor: "transparent" }}>
                    <Typography variant="h5" className="text-center mb-4 fw-bold" style={{ fontFamily: "cursive" }}>
                        Cool chat
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box className="mb-5">
                            <TextField

                                label="Username"
                                fullWidth
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "black" },
                                        "&:hover fieldset": { borderColor: "black" },
                                        "&.Mui-focused fieldset": { borderColor: "black" },
                                    },
                                    "& .MuiInputLabel-root": { color: "black" },
                                    "& .MuiInputLabel-root.Mui-focused": { color: "black" },
                                    input: { color: "black", fontSize: "18px" },

                                }}
                            />

                            <TextField
                                className="mt-3"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "black" },
                                        "&:hover fieldset": { borderColor: "black" },
                                        "&.Mui-focused fieldset": { borderColor: "black" },
                                    },
                                    "& .MuiInputLabel-root": { color: "black" },
                                    "& .MuiInputLabel-root.Mui-focused": { color: "black" },
                                    input: { color: "black" },
                                }}
                            />
                        </Box>

                        <Button
                            type="submit"
                            disabled={disable}
                            fullWidth
                            variant="contained"
                            className="mt-2"
                            style={{ padding: "10px", borderRadius: "15px", height: "40px", backgroundColor: "black", fontWeight: "bold", fontSize: "20px" }}
                        >
                            {disable ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    variant="light"
                                />
                            ) : (
                                "Login"
                            )}
                        </Button>


                    </form>

                    {message && <p className="text-center mt-3 text-danger">{message}</p>}

                    <Typography className="text-center mt-3 text-secondary" variant="body2">
                        Don’t have an account?{" "}
                        <a href="/signup" className="fw-bold">Register</a>
                    </Typography>
                </CardContent>
            </Card>
            {/* --- END: Login Card --- */}
        </div>
    );
}