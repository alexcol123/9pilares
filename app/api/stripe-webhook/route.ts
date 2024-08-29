
// import { NextResponse } from "next/server";
// import stripe from "stripe";
// import db from '@/utils/db'

// export async function POST(request: Request) {
//   const body = await request.text();

//   const sig = request.headers.get("stripe-signature") as string;
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
//   } catch (err) {
//     return NextResponse.json({ message: "Webhook error", error: err });
//   }


//   // Get the ID and type
//   const eventType = event.type;

//   if (eventType === "checkout.session.completed") {

//     // if (eventType === "payment_intent.succeeded") {

//     const paymentIntentSucceeded = event.data.object;
//     // console.log(paymentIntentSucceeded)

//     // return new Response("", { status: 200 });


//     // console.log('checkou.session.completed Webhook received! ===============>');


//     if (!event?.data?.object?.metadata?.bookingId) {
//       throw new Error('Booking ID not found')
//     }
//     const { bookingId } = event.data.object.metadata;




//     await db.booking.update({
//       where: { id: bookingId },
//       data: { paymentStatus: true },
//     })

//     // console.log('WEBHOOK  ROUTE = Webhook received! ===============>  payment status updated' + bookingId);
//   }



//   return new Response("", { status: 200 });
// }



