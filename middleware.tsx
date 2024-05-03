import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import path from "path";


export async function middleware(req: NextRequest){
    const token = await getToken({ req })
    const { pathname } = req.nextUrl;
    if (token) {
  
        if(token.role == "admin" && pathname.startsWith("/admin"))
            return NextResponse.next();
        if(!pathname.startsWith("/profile")){
            return NextResponse.redirect(new URL('/profile', req.url))
        }
    }else{
        if(!(pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup")))
            return NextResponse.redirect(new URL('/auth/signin', req.url))
        if(pathname == "/")
            return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin', '/profile', '/', '/auth/:path*'],
  }