import prisma from "../libs/prismadb";


export const getUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            orderBy:{
                createdAt: "desc"
            }
        })
        return users;
    } catch (error) {
        console.log(error)
    }
}