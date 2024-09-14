// a file to manage route for auth (protected routes) and public routes

// import the authConfigue to because auth use the prismaAdapter
import authConfig from "./auth.config";

import NextAuth from "next-auth";

// distructure the auth from the auth config
const {auth} = NextAuth(authConfig);


// import all the route that we need in file (routes.ts)
import {
    publicRoutes,
    authRoutes,
    authPrefixe,
    DEFAULT_LOGIN_REDIRECT,
} from "./routes";

// export the default auth
export default auth((req: any) => {
    // execute function for the route that you are (for use all the route (in the macher))
    const {nextUrl} = req;
    const isLogin = !!req.auth;

    const isApiRoutes = nextUrl.pathname.startsWith(authPrefixe);
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

    if (isApiRoutes) {
        return;
    }

    // check is we are in the auth routes
    if (isAuthRoutes) {
        if (isLogin) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    // check if the user is not login and is not in a public route
    if (!isLogin && !isPublicRoutes) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }


    // and in the end allow all the authore routes
    return;
})





// export the configue (mathcer)
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}