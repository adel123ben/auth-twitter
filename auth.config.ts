// import the CredentialsProvider
// import Credentials from "next-auth/providers/credentials";

// import the login Sckemas
import { LoginSckemas } from "./schemas";

// import bcryptjs
import bcrypt from "bcryptjs";

// import type next auth config
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/user";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google"

export default {
    providers: [
        Github({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const validateFields = LoginSckemas.safeParse(credentials);

                if (validateFields.success) {
                    // get the email and the password
                    const {email, password} = validateFields.data;

                    // check if user exitse by email
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if(passwordMatch) {
                        return user;
                    }
                }

                return null;
            }
        })
    ]
} satisfies NextAuthConfig
