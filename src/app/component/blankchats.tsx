// app/requests/page.tsx
"use client";

import React from "react";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';

export default function Blankchat() {
    return (
        <Box
            className="no-requests-root"
            sx={{
                minHeight: "60vh",
                display: "flex",

                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f6fff6",
                p: 2,
            }}
        >
            <Card
                elevation={6}
                sx={{
                    width: { xs: "99%", sm: 560 },
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                }}
            >
                {/* top strip */}
                <Box
                    sx={{
                        height: 120,
                        background:
                            "linear-gradient(135deg, rgba(198,255,199,1) 0%, rgba(161,245,176,1) 50%, rgba(140,235,158,1) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                    }}
                >
                    <Avatar
                        sx={{
                            width: 68,
                            height: 68,
                            bgcolor: "#ffffff",
                            color: "#2e7d32",
                            boxShadow: "0 6px 18px rgba(46,125,50,0.12)",
                        }}
                    >
                        <ChatIcon sx={{ fontSize: 36 }} />
                    </Avatar>
                </Box>

                <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#2e7d32", mb: 1 }}>
                        No Chats Yet
                    </Typography>

                    <Typography variant="body1" sx={{ color: "#4b4b4b", mb: 3 }}>
                        Looks like you do not have any chats at the moment.
                        search in your friendslist add them to start a chat.
                    </Typography>



                    <Typography variant="caption" sx={{ color: "#6b6b6b", display: "block" }}>
                        Tip: Share your profile link with friends to get requests faster.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
