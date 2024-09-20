"use server";

import { LoginSckemas } from "@/schemas";

// import authErro to toggle the next-auth error
import { AuthError } from "next-auth";

// import the signIn from the auth
import { signIn } from "@/auth";

import * as z from "zod"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";



export const login = async (values: z.infer<typeof LoginSckemas>) => {
    const validateFields = LoginSckemas.safeParse(values)

    if(!validateFields.success) {
        return {error: "Invalid Fields!"}
    }


    
    // extract the password and the email from the values
    const {email, password} = validateFields.data;
    
    try{
        // sign in the user
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });

        return {success: "Login Successful!"}
    }catch(e: any){
        if(e instanceof AuthError) {
            // add swiche and case for the error
            switch(e.type) {
                case "CredentialsSignin":
                    return {error: "Invalid Email or Password!"}
                default:
                    return {error: "something went wrong!"}
            }
        }

        throw e;
    };



};