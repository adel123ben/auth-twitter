import prisma from "@/lib/db";


export const getUserByEmail = async (email: string) => {
    try{
        // FIND THE USER WITHE IS EMAIL
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        // AND FINALY RETURN THE USER
        return user;
    }catch(e: any) {
        console.log("this is the error: ", e)
        // RETURN NULL SO (ANYTHIGS)
        return null;
    }
}


export const getUserById = async (id: string) => {
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        return user;
    }catch(e: any){
        console.log("the error is: ", e)
        return null;
    }
}