"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// IMPORT THE BUTTON FROM SHADCN/UI
import { Button } from "../ui/button";

// interface SocialProps {
//     isShow?: boolean;
// }



export const Socile = () => {
    // if(!isShow) return null;
    return (
        <div className="flex items-center w-full gap-x-2">
        <Button onClick={() => {}} className="w-full" variant="outline" size="lg">
            <FcGoogle className="h-5 w-5" />
        </Button>
        <Button onClick={() => {}} className="w-full" variant="outline" size="lg">
            <FaGithub className="h-5 w-5" />
        </Button>
    </div>
    )
}