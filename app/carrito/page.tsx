'use client'

import { useCartStore } from "@/utils/store"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency } from "@/utils/format"
import Image from "next/image"
import Link from "next/link"
import { MasUnoBtn, MenosUnoBtn, RemoveOneProduct, RemoverTodosProductosBtn } from "@/components/myComponents/cart/CartButtons"
import Title from "@/components/myComponents/products/Title"
import ListaVacia from "@/components/myComponents/home/ListaVacia"
import { Button } from "@/components/ui/button"
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import CheckOutClient from "./checkout"


const PaginaCarrito = () => {
  const { listaDeProductos, subTotal, total, cantidadArticulos, } = useCartStore(state => state)

  const carritoVacio = listaDeProductos.length === 0

  if (carritoVacio) return <div className="pt-40">
    <ListaVacia
      encabezado="Carrito Vacio."
      mensaje="No hay productos en tu carrito haz click en el boton para volver a la pagina de productos."
      textoBoton="Ver Productos."
    />
  </div>



  if (!subTotal) return <div className="text-center mt-20"> Loading</div>


  return (
    <div>
      <div className="text-center mb-20">
        <h2 className=" text-center text-3xl pt-10 mb-4  ">Carrito de compras</h2>
        <p className="">Productos en Carrito: <span className="text-primary font-semibold">{cantidadArticulos}</span></p>
      </div>

      <Table>
        <TableCaption>Lista de productos.</TableCaption>
        <TableHeader>


          <TableRow>
            <TableHead className="w-[100px]">Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className=" text-center ">Cantidad</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {listaDeProductos.map((producto) => {
            return (
              <TableRow key={producto.id}  >

                <TableCell>
                  <Link href={`/productos/${producto.id}`}>
                    <Image src={producto.imagenes[0]} alt={producto.nombre} width={70} height={70} className="object-cover rounded-md aspect-square" />
                  </Link>
                </TableCell>

                <TableCell className="font-medium  ">
                  <div className="flex flex-col justify-start items-start">
                    <Link href={`/productos/${producto.id}`}>
                      <>{producto.nombre}</>
                    </Link>
                    <RemoveOneProduct producto={producto} />
                  </div>
                </TableCell>

                <TableCell>{formatCurrency(producto.precio)}</TableCell>

                <TableCell  >
                  <div className="flex  items-center justify-center " >

                    <MenosUnoBtn producto={producto} />

                    <p className="mx-3"> {producto.cantidadParaComprar}</p>
                    <MasUnoBtn producto={producto} />
                  </div>
                </TableCell>

                <TableCell className="text-right">{formatCurrency(producto.precio * producto.cantidadParaComprar)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>

        <TableFooter className="bg-transparent">
          <TableRow className="h-24 hover:bg-transparent">
            <TableCell colSpan={2}>
              <RemoverTodosProductosBtn />
            </TableCell>
            <TableCell className="text-right" colSpan={2}>Subtotal</TableCell>
            <TableCell className="text-right "> {formatCurrency(subTotal)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="flex  flex-col gap-6 w-fit ml-auto">
        <CheckOutClient />

        <Button asChild size={'sm'} variant={'link'} className="text-secondary-foreground opacity-50" >
          <Link href="/">
            <MdOutlineKeyboardBackspace className="ml-3  text-left" />
            Seguir comprando
          </Link>
        </Button>


      </div>

    </div>
  )
}
export default PaginaCarrito