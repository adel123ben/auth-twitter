import { UserRole } from "@prisma/client";
import NextAuth, {type DefaultSession} from "next-auth";

export type ExtandedUser = DefaultSession["user"] & {
    role: UserRole;
    isOAuth: boolean;
    name: string | undefined;
    image: string | undefined;
    // image: string | null;
}

declare module "next-auth" {
    interface Session {
        user: ExtandedUser;
    }
}