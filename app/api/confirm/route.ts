import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
import { redirect } from 'next/navigation'
import db from '../../../utils/db'
import { type NextRequest, type NextResponse } from 'next/server'
import { use } from 'react'

// import { sendEmailAction } from '@/utils/actions'


export const GET = async (req: NextRequest) => {


  const { searchParams } = new URL(req.url)
  const session_id = searchParams.get('session_id') as string

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)


    let myOrderData: null | {
      id: string;
      amount: number;
      deliveryStatus: string;
      paymentStatus: boolean;
      products: string;
      createdAt: Date;
      updatedAt: Date;
      perfilId: string;
    } = null;

    const ordenId = session.metadata?.ordenId


    if (session.status === 'complete' && ordenId) {
      const updatedOrden = await db.orden.update({
        where: { id: ordenId },
        data: { paymentStatus: true },
      })

      myOrderData = updatedOrden
    }

    if (myOrderData !== null) {

      let productOrdenado = JSON.parse(myOrderData.products)

      productOrdenado.forEach(async (product: any) => {
        await db.producto.update({
          where: { id: product.id },
          data: {
            vendidos: {
              increment: product.cantidadParaComprar
            },
            cantidad: {
              decrement: product.cantidadParaComprar
            }
          },
        })
      })

    }
    
    myOrderData= null


    // productsOrderes.forEach(async (product: any) => {
    //   await db.producto.update({
    //     where: { id: product.id },
    //     data: {
    //       vendidos: {
    //         increment: product.cantidadParaComprar
    //       },
    //       cantidad: {
    //         decrement: product.cantidadParaComprar
    //       }
    //     },
    //   })
    // })

    // const emailData = {
    //   totalCost: myOrderData?.orderTotal ?? 0,
    //   totalNights: myOrderData?.totalNights ?? 0,
    //   email: session?.customer_details?.email ?? '',
    //   name: session?.customer_details?.name ?? ''
    // }

    // await sendEmailAction({
    //   email: emailData.email,
    //   name: emailData.name,
    //   totalCost: emailData.totalCost,
    //   totalNights: emailData.totalNights
    // })

    // console.log('email sent im in  CONFIRM ROUTE -------------------------------------------------------  ')


  } catch (err) {
    console.log(err)
    return Response.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    })
  }
  // add 
  redirect('/mis-compras')
}
