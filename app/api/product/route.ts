import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();
  try {
    if (!currentUser || currentUser.role !== "ADMIN") {
      return new NextResponse(
        JSON.stringify({ error: "You must be logged in" }),
        {
          status: 401,
        }
      );
    }
    const body = await req.json();

    // Create user in the database
    const product = await prisma.products.create({
      data: {
        ...body,
      },
    });

    // Assuming the user exists and login is successful
    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    // Handle errors
    console.error("Error during login:", error);
    // Return appropriate error response
    return NextResponse.error();
  }
};

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
    const { id, inStock } = body;
    const product = await prisma.products.update({
        where: { id },
        data: { inStock },
      });
    return NextResponse.json({ success: true, product });
  } catch (error) {
    // Handle errors
    console.error("Error during login:", error);
    // Return appropriate error response
    return NextResponse.error();
  }
};
