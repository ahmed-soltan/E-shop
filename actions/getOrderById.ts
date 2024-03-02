import { NextResponse } from 'next/server';
import prisma from '../libs/prismadb';

type OrderParams = {
    id: string;
}

export const getOrder = async (id: string) => {
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: id
            }
        })
        if(!order){
            return new NextResponse(JSON.stringify({
                message: "Order not found"
            }), { status: 404 });
        }
        return order
    } catch (error) {
        
    }
}