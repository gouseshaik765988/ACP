"use client";
import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useClerk } from "@clerk/nextjs"; // Import useClerk hook
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"; // Import useDispatch
import { clearUser } from "@/store/userSlice"; // Import the clearUser action

interface User {
    user?: string;
    fname: string;
    profilePic: string;
    username?: string;
}

interface TopbarProps {
    user: User;
    onSearchClick: () => void;
    isHome?: boolean;
}

export default function Topbar({ user, onSearchClick, isHome }: TopbarProps) {
    const router = useRouter();
    const dispatch = useDispatch(); // Initialize the dispatch hook
    const { signOut } = useClerk(); // Initialize the useClerk hook for programmatic sign out

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const options: { label: string; type?: "signout" | "default" }[] = [
        { label: "settings" },
        { label: "Sign Out", type: "signout" },
    ];

    const handleClick = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    // ✅ New handler function for sign out
    const handleSignOut = async () => {
        handleClose(); // Close the menu
        // Clear the Redux state first
        await signOut({ redirectUrl: "/" });
        dispatch(clearUser());
        // Programmatically sign out via Clerk
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                color: "black",
                bgcolor: "#f0fdf0",
                boxShadow: "none",
                zIndex: 10,
            }}
        >
            <Toolbar>
                {/* Back button only if NOT on home page */}
                {!isHome && (
                    <IconButton onClick={() => router.back()} edge="start" color="inherit">
                        <ArrowBackIosIcon />
                    </IconButton>
                )}

                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, ml: 2, fontWeight: "bold", color: "inherit" }}
                >
                    {isHome ? `Hi ${user.fname}` : ""}
                </Typography>

                <IconButton color="inherit" onClick={onSearchClick}>
                    <SearchIcon />
                </IconButton>

                <IconButton color="inherit">
                    <NotificationsIcon />
                </IconButton>

                <IconButton color="inherit" onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>

                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    {options.map((option, idx) => (
                        <MenuItem
                            key={idx}
                            onClick={() => {
                                // If it's the signout option, use our custom handler
                                if (option.type === "signout") {
                                    handleSignOut();
                                    return;
                                }
                                // Otherwise, close the menu and navigate
                                handleClose();
                                router.push(`/${option.label}`);
                            }}
                        >
                            {/* We no longer need the SignOutButton component wrapper here, 
                                as handleSignOut handles everything programmatically. */}
                            <span>{option.label}</span>
                        </MenuItem>
                    ))}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
