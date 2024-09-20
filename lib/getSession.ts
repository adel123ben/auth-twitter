// use for in the server action


import { auth } from "@/auth";

export const getUserServer = async () => {
    const user = await auth();
    // return the user sesion
    return user?.user;
}