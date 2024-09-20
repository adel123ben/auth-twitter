"use server";

import * as z from "zod"
import prisma from "@/lib/db";
import { userInfoSkemas } from "@/schemas";

// get the user in server componets
import { getUserServer } from "@/lib/getSession";
import { getUserById } from "@/data/user";

export const settings = async (values: z.infer<typeof userInfoSkemas>) => {
    const user = await getUserServer();
    if(!user) {
        return {error: "unothorize"}
    }

    // chek if the user existe on the database
    const existingUser = await getUserById(user.id as string);
    if(!existingUser) {
        return {error: "user dos not existe"}
    }

    // update the field withe the userid
    await prisma.user.update({
        where: {id: existingUser.id},
        data: {
            ...values
        }
    })
    


    
    return {succes: "user Updatetd"}
}