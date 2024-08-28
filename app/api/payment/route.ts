import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
import { type NextRequest, type NextResponse } from 'next/server'
import db from '../../../utils/db'
// import { formatDate } from '@/utils/format'


export const POST = async (req: NextRequest, res: NextResponse) => {

  const requestHeaders = new Headers(req.headers)
  const origin = requestHeaders.get('origin')

  const { ordenId } = await req.json()

  const ordenParaPagar = await db.orden.findUnique({
    where: { id: ordenId },
  })


  if (!ordenParaPagar) {
    return Response.json(null, {
      status: 404,
      statusText: 'Not Found',
    })
  }


  const {
    amount, products,
  } = ordenParaPagar


  const todosProductos = JSON.parse(products)


  const lineaDeItemos = todosProductos.map((p: any) => {
    return {
      quantity: p.cantidadParaComprar || 1,
      price_data: {
        currency: 'usd',
        product_data: {
          name: p.nombre,
          images: [p.imagenes[0]],
          description: p.hashtag
        },
        unit_amount: p.precio * 100
      }
    }
  }
  )



  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      metadata: { ordenId },
      line_items: lineaDeItemos,
      mode: 'payment',
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    })

    return Response.json({ clientSecret: session.client_secret })
  } catch (error) {
    console.log(error)

    return Response.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    })
  }

}