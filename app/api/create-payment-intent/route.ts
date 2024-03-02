import { products } from "../../../Utils/products";
import Stripe from "stripe";
import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";
import { ProductCartType } from "@/app/product/[id]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { amber } from "@mui/material/colors";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const calculateOrderAmount = async (items: ProductCartType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  return Math.floor(totalPrice);
};

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse(
      JSON.stringify({ error: "You must be logged in" }),
      {
        status: 401,
      }
    );
  }

  const body = await req.json();

  const { items, payment_intent_id } = body;

  const totalPrice = (await calculateOrderAmount(items)) * 100;
  const orderDetail = {
    user: { connect: { id: currentUser.id } },
    amount: totalPrice,
    currency: "usd",
    paymentIntentId: payment_intent_id || "",
    status: "pending",
    deliveryStatus: "pending",
    products: items,
  };

  if (payment_intent_id) {
    const currentIntent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (currentIntent) {
      const paymentIntent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: totalPrice,
        }
      );

      const [existing_order, updated_order] = await Promise.all([
        prisma.order.findFirst({
          where: {
            paymentIntentId: payment_intent_id,
          },
        }),
        prisma.order.update({
          where: {
            paymentIntentId: payment_intent_id,
          },
          data: {
            amount: totalPrice,
            products: items,
          },
        }),
      ]);

      if (!existing_order) {
        return new NextResponse(JSON.stringify({ error: "Order not found" }), {
          status: 401,
        });
      }
      return NextResponse.json({ success: true, paymentIntent });
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    console.log("paymentIntent.id" , paymentIntent.id)

    orderDetail.paymentIntentId = paymentIntent.id;

    await prisma.order.create({
      data: orderDetail,
    });

    return NextResponse.json({ success: true, paymentIntent });
  }
};
