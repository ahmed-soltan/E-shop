import { NextResponse } from 'next/server';
import prisma from '../libs/prismadb';

type OrderParams = {
    id: string;
}

export const getOrderByUserId = async (id: string) => {
    try {
        const orders = await prisma.order.findMany({
            include:{
                user:true
            },
            where:{
                userId:id
            }
        })
        if(!orders){
            return new NextResponse(JSON.stringify({
                message: "Order not found"
            }), { status: 404 });
        }
        return orders
    } catch (error) {
        
    }
}