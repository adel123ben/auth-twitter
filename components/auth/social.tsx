"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// import sign to us it in client componets 
import {signIn} from "next-auth/react"

// IMPORT THE BUTTON FROM SHADCN/UI
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

// interface SocialProps {
//     isShow?: boolean;
// }



export const Socile = () => {
    // if(!isShow) return null;

    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        })
    }
    return (
        <div className="flex items-center w-full gap-x-2">
        <Button onClick={() => onClick("google")} className="w-full" variant="outline" size="lg">
            <FcGoogle className="h-5 w-5" />
        </Button>
        <Button onClick={() => onClick("github")} className="w-full" variant="outline" size="lg">
            <FaGithub className="h-5 w-5" />
        </Button>
    </div>
    )
}