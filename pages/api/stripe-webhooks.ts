import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).json({ error: "No signature provided" });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }

  switch (event?.type) {
    case "charge.succeeded":
      const charge: any = event.data.object as Stripe.Charge | undefined;

      if (charge && typeof charge.payment_intent === "string") {
        await prisma?.order.update({
          where: {
            paymentIntentId: charge.payment_intent,
          },
          data: {
            address: charge.shipping?.address,
            status: "Complete",
          },
        });
      }
      break;
    default:
      console.log("unHandled Event Type" , event.type)
      break;
  }
  return res.status(200).json({ received: true });
};
