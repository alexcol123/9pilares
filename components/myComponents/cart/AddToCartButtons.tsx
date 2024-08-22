'use client'

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/utils/store"
import { sub } from "date-fns"
import { use, useState } from "react"
import { FaCartPlus } from "react-icons/fa"
import CartStateTest from "./CartStateTest"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const AddToCartButtons = ({ producto }: { producto: any }) => {

  const agregarProducto = useCartStore((state) => state.agregarProducto)
  const removerProducto = useCartStore((state) => state.removerProducto)
  const removerTodosProductos = useCartStore((state) => state.limpiarCarrito)
  const removerUnoDelProducto = useCartStore((state) => state.removerUnoDelProducto)
  const agregarUnoDelProducto = useCartStore((state) => state.agregarUnoDelProducto)
  producto.cantidadParaComprar = 1

  return (

    <div className="w-full  flex  gap-8 items-center justify-center mt-8 mb-20 ">



      <Button
        onClick={() =>
          [
            agregarProducto(producto),
            toast({
              title: 'Producto agregado al carrito:',
              description: producto.nombre
            })


          ]}
        size={'lg'} className="bg-primary text-white font-semibold  mt-8">Agregar al carrito <FaCartPlus size={18} className="ml-4" />  </Button>

      <Button
        onClick={() => [removerProducto(producto.id), toast({
          title: 'Producto eliminado del carrito:',
          description: producto.nombre
        })
        ]}
        size={'lg'} className="bg-destructive text-white font-semibold  mt-8">remover Producto <FaCartPlus size={18} className="ml-4" />  </Button>
      <Button
        onClick={() => [removerTodosProductos(), toast({
          title: 'Carrito eliminado',
          description: 'Todos los productos han sido eliminados del carrito'
        })
        ]}
        size={'lg'} className="bg-destructive text-white font-semibold  mt-8">remover todo <FaCartPlus size={18} className="ml-4" />  </Button>

      <Button
        onClick={() => [removerUnoDelProducto(producto.id), toast({
          title: 'Cantidad -1:',
          description: producto.nombre
        })
        ]}
        size={'lg'} className="bg-green-500 text-white font-semibold  mt-8"> -  </Button>


      <Button
        onClick={() => [agregarUnoDelProducto(producto.id), toast({
          title: 'Cantidad +1:',
          description: producto.nombre
        })
        ]}
        size={'lg'} className="bg-green-500 text-white font-semibold  mt-8"> + </Button>

    </div>
  )
}
export default AddToCartButtons