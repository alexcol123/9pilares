import { fetchUnProducto } from "@/utils/actions"
import { redirect } from "next/navigation"
import LoadingCard from "../LoadingCard"
import BreadCrumbs from "@/components/myComponents/products/BreadCrumbs"
import ShareButton from "@/components/myComponents/products/ShareButton"
import FavoriteToggleButton from "@/components/myComponents/card/FavoriteToggleButton"
import ContenedorImagen from "@/components/myComponents/products/ContenedorImagen"
import ProductRating from "@/components/myComponents/card/ProductRating"
import { formatCurrency } from "@/utils/format"
import { Button } from "@/components/ui/button"
import { FaCartPlus } from "react-icons/fa"
import Image from "next/image"
import ProductImages from "@/components/myComponents/products/ProductImages"
import SubmitReview from "@/components/myComponents/review/SubmitReview"
import ProductReviews from "@/components/myComponents/review/ProductReviews"

const SingleProductPage = async ({ params }: { params: { id: string } }) => {


  const producto = await fetchUnProducto(params.id)


  if (!producto) redirect('/')

  console.log(producto)

  const percentageOff = Math.round((producto.precioElevado - producto.precio) / producto.precioElevado * 100)


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

      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-12 mb-20 ">
        <ContenedorImagen imagenes={producto.imagenes} nombre={producto.nombre} />


        <div className="flex flex-col  justify-center gap-3 mt-10 max-w-lg  p-6 h-full rounded-xl  border border-primary ">
          {producto.onSale && <p className="bg-destructive text-white font-semibold p-2 rounded-md text-center mb-28">
            Super Oferta - Termina Pronto</p>}

          <h1 className="text-2xl font-bold capitalize">{producto.nombre}</h1>
          <h2 className=" opacity-700 font-semibold text-base">{producto.tagline}</h2>


          <ProductRating size={20} />


          <div className="grid   gap-2 items-center mt-6   ">
            <p className="font-semibold text-xl text-primary  "> {formatCurrency(producto.precio)}</p>
            <div className="flex  gap-3 ">
              <p className="font-semibold  text-sm line-through "> {formatCurrency(producto.precioElevado)}</p>

              {percentageOff > 0 && <p className="font-semibold text-sm  text-destructive  "> {percentageOff}% Descuento</p>}
            </div>
          </div>


          <div>
            <Button size={'default'} className="bg-primary text-white font-semibold  mt-8  ">Agregar al carrito <FaCartPlus size={18} className="ml-4" />  </Button>
          </div>

        </div>
      </div>

      <div className="bg-muted px-2 rounded-xl py-8 ">
        <div className="mt-2">
          <p className="font-semibold"> Descripcion:</p>
          <p className="text-md opacity-70">{producto.descripcion}</p>
        </div>

        <div className="mt-10">
          <p className="font-semibold"> Categoria:
            <span className="text-md text-primary capitalize font-bold ml-2"> {producto.categoria} </span>
          </p>
        </div>



        {
          (producto.ancho !== 0 || producto.alto !== 0 || producto.largo !== 0) && (
            <div className="mt-10">
              <p className="font-semibold"> Medidas: </p>

              {producto.ancho !== 0 && <p className="font-semibold"> Ancho:
                <span className="text-md text-primary   ml-2 "> {producto.ancho} cm</span>
              </p>}

              {producto.alto !== 0 && <p className="font-semibold"> Altura:
                <span className="text-md text-primary   ml-2"> {producto.alto} cm </span>
              </p>}

              {producto.largo !== 0 && <p className="font-semibold"> Altura:
                <span className="text-md text-primary   ml-2"> {producto.alto} cm </span>
              </p>}

            </div>
          )
        }


        {/* Main Image  */}
        <section className="flex flex-col items-center justify-center">
          <h1 className="text-2xl mt-40 text-center my-3 bg-secondary-foreground text-secondary py-2 px-6 rounded-xl ">Imagenes</h1>
          <Image src={producto.imagenes[0]} width={600} height={600} alt={producto.nombre} className="mb-6" />



        </section>

        {/* Other  Images  */}
        <ProductImages imagenes={producto.imagenes} />


        {producto.perfil && (
          <div className="flex gap-4 items-center  justify-between bg-yellow-200 p-2 rounded-xl mt-20 mb-8 px-4 ">
            <div className="flex flex-col justify-center  ">

              <h4 className="font-bold text-slate-900 ">   {producto?.perfil?.nombre}  Store</h4>
              <h5 className=" font-semibold text-sm text-slate-700">  99.7% Comentarios positivos - Mas de 9,156 ventas</h5>
            </div>
            <Image src={producto?.perfil?.imagenPerfil} width={50} height={50} alt={'tienda'} className="rounded-full object-cover aspect-square " />
          </div>


        )}


      </div>

      <section className="my-10">
        <SubmitReview productoId={producto.id} />
        <ProductReviews productoId={producto.id} />
      </section>


      <section>
        <div className="w-full  flex  gap-2 items-center justify-center mt-8 mb-20">
          <Button size={'lg'} className="bg-primary text-white font-semibold  mt-8">Agregar al carrito <FaCartPlus size={18} className="ml-4" />  </Button>

          <Button size={'lg'} className="bg-destructive text-white font-semibold  mt-8">Comprar ahora  <FaCartPlus size={18} className="ml-4" />  </Button>
        </div>

      </section>




    </section>
  )
}
export default SingleProductPage