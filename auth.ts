import NextAuth from "next-auth";

// add prisma adapter
import {PrismaAdapter} from "@auth/prisma-adapter";

// import the database utils
import prisma from "./lib/db";

// we user auth.js the version 5 of next-auth

// import the auth configue and in this file we can use prisma bat no in the confique because configue is fo middleware that use the edje
import authConfig from "./auth.config";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    // add the prisma adapter
    adapter: PrismaAdapter(prisma),
    // use jwt strategy
    session: {strategy: "jwt"},


    // copie the app cconfigue
    ...authConfig,
});