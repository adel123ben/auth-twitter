// this is the file to get an account withe the userId
import prisma from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
    try{
        const getAccount = await prisma.account.findFirst({
            where: {userId: userId},
        });

        return getAccount;
    }catch(e: any) {
        console.log("this is the error: ", e);
        return null;
    }
}