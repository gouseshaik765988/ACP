import React from "react";
import { Skeleton, Box, Tabs, Tab, Card, CardContent } from "@mui/material";

const FriendListSkeleton = () => {
    return (
        <Box sx={{ width: "100%", p: 2 }}

        >
            {/* Top Tabs Skeleton */}
            <Tabs value={0} centered>
                <Tab
                    label={
                        <Skeleton
                            variant="rounded"
                            width={120}
                            height={30}
                            sx={{ bgcolor: "#b3ffb3" }} // Light green
                        />
                    }
                />
                <Tab
                    label={
                        <Skeleton
                            variant="rounded"
                            width={120}
                            height={30}
                            sx={{ bgcolor: "#b3ffb3" }} // Light green
                        />
                    }
                />
                <Tab
                    label={
                        <Skeleton
                            variant="rounded"
                            width={120}
                            height={30}
                            sx={{ bgcolor: "#b3ffb3" }} // Light green
                        />
                    }
                />
            </Tabs>

            {/* User Card List Skeleton */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <Card
                    key={item}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        mt: 2,
                        borderRadius: 3,
                    }}
                >
                    {/* Avatar */}
                    <Skeleton
                        variant="circular"
                        width={60}
                        height={60}
                        sx={{ bgcolor: "#ccffcc" }} // lighter green
                    />

                    {/* Name & Details */}
                    <CardContent sx={{ width: "100%" }}>
                        <Skeleton
                            variant="rounded"
                            width="50%"
                            height={20}
                            sx={{ bgcolor: "#b3ffb3" }}
                        />
                        <Skeleton
                            variant="rounded"
                            width="30%"
                            height={18}
                            sx={{ bgcolor: "#ccffcc", mt: 1 }}
                        />
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default FriendListSkeleton;
