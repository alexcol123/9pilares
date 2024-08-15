import { fetchUnProducto } from "@/utils/actions"
import { redirect } from "next/navigation"
import LoadingCard from "../LoadingCard"
import BreadCrumbs from "@/components/myComponents/products/BreadCrumbs"
import ShareButton from "@/components/myComponents/products/ShareButton"
import FavoriteToggleButton from "@/components/myComponents/card/FavoriteToggleButton"
import ContenedorImagen from "@/components/myComponents/products/ContenedorImagen"
import ProductRating from "@/components/myComponents/card/ProductRating"
import { formatCurrency } from "@/utils/format"
const SingleProductPage = async ({ params }: { params: { id: string } }) => {


  const producto = await fetchUnProducto(params.id)


  if (!producto) redirect('/')

  console.log(producto)

  return (

    <section className="w-full">
      <BreadCrumbs nombre={producto.nombre} />

      <header className="flex justify-between items-center mt-4 ">


        <div className="flex   justify-end w-full gap-2">
          {/* share buttons */}
          <ShareButton productoId={producto.id} nombre={producto.nombre} tagline={producto.tagline} />
          <FavoriteToggleButton productoId={producto.id} />
        </div>


      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 j justify-center gap-12 ">
        <ContenedorImagen imagenes={producto.imagenes} nombre={producto.nombre} />


        <div className="flex flex-col gap-3 mt-10 max-w-lg">
          <h1 className="text-xl font-bold">{producto.nombre}</h1>
          <h2 className=" opacity-700 font-semibold text-base">{producto.tagline}</h2>


          <ProductRating />


          <div className="flex  gap-3 items-end   ">
            <p className="font-semibold text-lg   "> {formatCurrency(producto.precio)}</p>
            <p className="font-semibold  text-sm line-through  mb-[2px] text-destructive "> {formatCurrency(producto.precioElevado)}</p>
          </div>



        </div>
      </div>

      <div className="mt-8">
        <p className="font-semibold"> Descripcion:</p>
        <p className="text-md opacity-70">{producto.descripcion}</p>
      </div>




    </section>
  )
}
export default SingleProductPage