import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export const PUT = async (req: Request) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "ADMIN") {
      return new NextResponse(
        JSON.stringify({ error: "You must be logged in" }),
        {
          status: 401,
        }
      );
    }
    const body = await req.json();
    const { id, deliveryStatus } = body;
    const product = await prisma.order.update({
        where: { id },
        data: { deliveryStatus },
      });
    return NextResponse.json({ success: true, product });
  } catch (error) {
    // Handle errors
    console.error("Error during login:", error);
    // Return appropriate error response
    return NextResponse.error();
  }
};
