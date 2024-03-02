import { Order } from "@prisma/client";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
export const POST = async (request: Request) => {
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  if (!currentUser) {
    return new NextResponse(
      JSON.stringify({ error: "You must be logged in" }),
      {
        status: 401,
      }
    );
  }

  const body = await request.json();
  const { comment, rating, product, userId } = body;
  console.log(product);
  const deliveredOrder = currentUser && currentUser.orders && currentUser.orders.some((order: any) => {
    return order.products.find(
        (item: any) =>
            item.id === product.id && order.deliveryStatus === "delivered"
    );
});


  const userReview = product?.reveiws && product?.reveiws.find((review: any) =>review.userId === currentUser?.id);
  if(userReview) {
    return new NextResponse(
      JSON.stringify({ error: "You have already reviewed this product before" }),
      {
        status: 401,
      }
    );
  }

  if (!deliveredOrder) {
    return new NextResponse(
      JSON.stringify({ error: "You have not Receive the product yet" }),
      {
        status: 401,
      }
    );
  }

  const Review = await prisma.review.create({
    data: {
      comment,
      rating,
      userId,
      productId: product.id,
    },
  });

  return new NextResponse(
    JSON.stringify(Review),
    {
      status: 200,
    })
};
