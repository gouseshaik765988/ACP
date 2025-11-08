import { NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import Userslist from "@/models/Userslist";

export async function GET() {
    await connectMongo();
    const users = await Userslist.find();
    return NextResponse.json(users);
}
