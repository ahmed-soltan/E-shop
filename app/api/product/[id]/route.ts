import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "../../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(req :Request , {params}:{params:{id:string}}) {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
      return new NextResponse(
        JSON.stringify({ error: "You must be logged in" }),
        {
          status: 401,
        }
      );
    }
    const product = await prisma?.products.delete({
        where: {
          id: params.id, 
        },
      });
      

    return new NextResponse(JSON.stringify(product), { status: 200 });

}
