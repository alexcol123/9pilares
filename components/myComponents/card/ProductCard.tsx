import { Card } from "@/components/ui/card"
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
    <Card className=" relative w-full max-w-xs rounded-xl border bg-muted pb-2 ">

      <div className=" ">

        <Link href={`/productos/${producto.id}`}>
          <div className="  aspect-[4/5] w-full overflow-hidden rounded-xl">
            <Image
              alt="Product image"
              className="aspect-[4/5] object-cover border w-full"
              height="450"
              src={producto.imagenes[0] || '/images/placeholder.png'}
              width="450"
            />



          </div>

          <div className="mt-1 space-y-3 p-2">
            <h3 className="font-semibold text-md  capitalize  w-full line-clamp-1">{producto.nombre}</h3>

            <ProductRating productId={producto.id} />

            <p className="text-xs capitalize  text-secondary-foreground line-clamp-2 ">{producto.tagline}</p>

            <div className="mt-2 flex  gap-3 items-end   ">
              <p className="font-semibold   "> {formatCurrency(producto.precio)}</p>
              <p className="font-semibold  text-sm line-through  mb-[2px] text-destructive "> {formatCurrency(producto.precioElevado)}</p>
            </div>

          </div>

        </Link>

        <div className="flex items-center justify-center">
          <AddToCartBtn producto={producto} />
        </div>

      </div>

      <div className=" absolute top-8 right-6 ">
        <FavoriteToggleButton productoId={producto.id} />
      </div>
    </Card>


  )
}
export default ProductCard


