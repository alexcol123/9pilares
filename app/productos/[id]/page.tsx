import { fetchUnProducto } from "@/utils/actions"
import { redirect } from "next/navigation"
import LoadingCard from "../LoadingCard"
import BreadCrumbs from "@/components/myComponents/products/BreadCrumbs"
import ShareButton from "@/components/myComponents/products/ShareButton"
const SingleProductPage = async ({ params }: { params: { id: string } }) => {


  const producto = await fetchUnProducto(params.id)


  if (!producto) redirect('/')

    console.log(producto)

  return (

    <section>
      <BreadCrumbs nombre={producto.nombre} />

      <header className="flex justify-between items-center mt-4">
      <h1 className="text-xl font-bold capitalize">{producto.tagline}</h1>

      <div className="flex items-center gap-4">
          {/* share buttons */}
          <ShareButton productoId={producto.id} nombre={producto.nombre} tagline={producto.tagline}  />
        </div>

      </header>

    </section>
  )
}
export default SingleProductPage