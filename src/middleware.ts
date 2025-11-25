// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/signup(.*)",
    "/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    // allow public routes
    if (isPublicRoute(req)) return NextResponse.next();

    const session = await auth(); // 👈 await the Promise
    const userId = session.userId; // now TypeScript knows this exists

    // protect all other routes
    if (!userId) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!.*\\..*|_next).*)",
        "/",
        "/(api|trpc)(.*)",
    ],
};
