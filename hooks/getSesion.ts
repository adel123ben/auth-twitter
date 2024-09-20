// this is the for the client folder

"use client";

import { useSession } from "next-auth/react";

export const getUser = () => {
    const user = useSession();
    return user.data?.user
}