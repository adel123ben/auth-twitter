"use server"

import { RegisterSckemas } from "@/schemas"
import * as z from "zod"

// import the signIn from the auth
import { signIn } from "@/auth";

// import the database from lib
import prisma from "@/lib/db"

// import this to find user withe email
import { getUserByEmail } from "@/data/user"

// import bcrypt to hash the password
import bcrypt from "bcryptjs";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


export const register = async (values: z.infer<typeof RegisterSckemas>) => {
    const validateFiel = RegisterSckemas.safeParse(values);
    if(!validateFiel.success) {
        return {error: "Invalid field"}
    }

    // chek if email existe on database
    const existingEmail = await getUserByEmail(validateFiel.data.email);
    if (existingEmail) {
        return {error: "Email already existed!"}
    }

    // hash the user password when he create an account on the database to get more secure
    const hashPassword = await bcrypt.hash(validateFiel.data.password, 10) 

    // if user d'ont existe create a new one in the database
    await prisma.user.create({
        data: {
            name: validateFiel.data.name,
            email: validateFiel.data.email,
            password: hashPassword,
        }
    });

    // sign in the user
    await signIn("credentials", {
        email: validateFiel.data.email,
        password: validateFiel.data.password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

    return {success: "User created succefully!"}
    


    
}

