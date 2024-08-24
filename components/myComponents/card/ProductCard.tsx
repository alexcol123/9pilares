import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ProductCardTypes } from "../home/ListaDeProductos"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { formatCurrency } from "@/utils/format"
import ProductRating from "./ProductRating"
import FavoriteToggleButton from "./FavoriteToggleButton"
import { AddToCartBtn } from "../cart/CartButtons"

const ProductCard = ({ producto }: { producto: ProductCardTypes }) => {

  if (!producto) return null

  return (
    <Card className=" relative max-w-xs rounded-xl bg-muted  pb-16  duration-1000">

      <Link href={`/productos/${producto.id}`}>

        <CardHeader>
          <Image
            alt="Product image"
            className="aspect-[4/5] object-cover border w-full"
            height="450"
            src={producto.imagenes[0] || '/images/placeholder.png'}
            width="450"
          />
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <h3 className="font-semibold text-md  capitalize  w-full line-clamp-1">{producto.nombre}</h3>

          <ProductRating productId={producto.id} />

          <p className="text-xs capitalize  text-secondary-foreground line-clamp-2  ">{producto.tagline}</p>

          <div className="flex  gap-3 items-end   ">
            <p className="font-semibold   "> {formatCurrency(producto.precio)}</p>
            <p className="font-semibold  text-sm line-through  mb-[2px] text-destructive "> {formatCurrency(producto.precioElevado)}</p>
          </div>

        </CardContent>

      </Link>
      <div className="flex self-end items-center justify-center w-full absolute bottom-6 left-0 right-0 ">
        <AddToCartBtn producto={producto} btnSize={'lg'} />
      </div>


      <div className=" absolute top-8 right-7 ">
        <FavoriteToggleButton productoId={producto.id} />
      </div>
    </Card>
  )
}
export default ProductCard


