import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  
    const path = request.nextUrl.pathname;
    console.log(`Path: ${path}`);

    const isPublicPath = path ==="/login" || path === "/signup" || path==="/verifyemail";

    const token = request.cookies.get("token")?.value || "";
    console.log(`Is Public Path: ${isPublicPath}`);
    console.log(`Token: ${token}`);

    if (isPublicPath && token){
        console.log('Redirecting to / because authenticated user is on public path.');
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (!isPublicPath && !token){
        console.log('Redirecting to /login because unauthenticated user is on a protected path.');
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    // return NextResponse.next();

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/",
    "/login",
    "/signup",
    "/profile",
    "/verifyemail"
  ]
}