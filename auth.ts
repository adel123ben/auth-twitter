import NextAuth from "next-auth";

// add prisma adapter
import {PrismaAdapter} from "@auth/prisma-adapter";
import { getUserById } from "./data/user";

// import the database utils
import prisma from "./lib/db";

// we user auth.js the version 5 of next-auth

// import the auth configue and in this file we can use prisma bat no in the confique because configue is fo middleware that use the edje
import authConfig from "./auth.config";
import { UserRole } from "@prisma/client";
import { getAccountByUserId } from "./data/account";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    // difind the pages hear
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    // defind the event hear
    events: {
        async signIn({ user }) {
            await prisma.user.update({
                where: {id: user.id},
                data: {
                    emailVerified: new Date(),
                },
            })
        },
        async linkAccount({ user }) {
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    emailVerified: new Date(),
                }
            })
        },
    },
    // defind the callbacks hear
    callbacks: {
        async session({token,session}) {
            if(token.sub && session.user) {
                session.user.id = token.sub;
            }

            if(token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if(session.user) {
                session.user.name = token.name as string;
                session.user.image = token.image as string;
                session.user.isOAuth = token.isOAuth as boolean;
            }



            return session;
        },
        async jwt({ token }) {
            // check if the user in loggin
            if(!token.sub) return token;

            const existingUsser = await getUserById(token.sub);
            if(!existingUsser) return token;

            // find a aacount withe the userID
            const existingAccount = await getAccountByUserId(existingUsser.id);

            token.isOAuth = !!existingAccount;
            token.name = existingUsser.name;
            token.image = existingUsser.image;
            token.role = existingUsser.role;
            return token;
        }
    },
    // add the prisma adapter
    adapter: PrismaAdapter(prisma),
    // use jwt strategy
    session: {strategy: "jwt"},


    // copie the app cconfigue
    ...authConfig,
});