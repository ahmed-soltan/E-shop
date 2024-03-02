import { nextOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '../libs/prismadb';
import { getServerSession } from "next-auth";



export async function getSessions(){
    return await getServerSession(nextOptions)
}

export const getCurrentUser = async ()=>{
    const session = await getSessions()
    if(!session?.user?.email){
        return null
    }

    const currentUser = await prisma.user.findUnique({
        where:{
            email:session.user.email
        },
        include:{
            orders:true
        }
    })

    if(!currentUser){
        return null
    }
    return {
        ...currentUser,
        createdAt: currentUser.createdAt?.toISOString(),
        updatedAt: currentUser.updatedAt?.toISOString(),
        emailVerified: currentUser.emailVerified?.toString() || null,
    }
}