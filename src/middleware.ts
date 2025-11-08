
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    //     return NextResponse.redirect(new URL("/", request.url))
    // }
    // export const config = {
    //     matcher: "/profile"
    // }
    //.................................................................................
    // if (request.nextUrl.pathname === '/profileo') {
    //     return NextResponse.redirect(new URL("/", request.nextUrl))
    // } 
    const Response = NextResponse.next();
    const theeper = request.cookies.get('theme')
    if (!theeper) {
        Response.cookies.set("theme", 'dark')
    }
    Response.headers.set('custom-header', 'customheader')
    Response.headers.set('custom-header2', 'customheader')


    return Response
}