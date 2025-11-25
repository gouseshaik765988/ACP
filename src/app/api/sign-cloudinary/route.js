import { NextResponse } from "next/server";
import cloudinary from "../../../lib/cloudinary";

export async function POST(req) {
    const body = await req.json();
    const signature = cloudinary.utils.api_sign_request(
        body,
        process.env.CLOUDINARY_API_SECRET
    );

    return NextResponse.json({ signature });
}
