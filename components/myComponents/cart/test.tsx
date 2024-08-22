'use client'

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/utils/store"
import { sub } from "date-fns"
import { use, useState } from "react"
import { FaCartPlus } from "react-icons/fa"
import CartStateTest from "./CartStateTest"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"


// const agregarProducto = useCartStore((state) => state.agregarProducto)
// const removerProducto = useCartStore((state) => state.removerProducto)
// const removerTodosProductos = useCartStore((state) => state.limpiarCarrito)
// const removerUnoDelProducto = useCartStore((state) => state.removerUnoDelProducto)
// const agregarUnoDelProducto = useCartStore((state) => state.agregarUnoDelProducto)
// producto.cantidadParaComprar = 1



export const AddToCartBtn = ({ producto }: { producto: any }) => {

  producto.cantidadParaComprar = 1

  const agregarProducto = useCartStore((state) => state.agregarProducto)


  return (
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
  )
}

export const RemoveFromCartBtn = ({ producto }: { producto: any }) => {
  const removerProducto = useCartStore((state) => state.removerProducto)
  return (
    <Button
      onClick={() =>
        [
          removerProducto(producto),
          toast({
            title: 'Producto removido del carrito:',
            description: producto.nombre
          })
        ]}
      size={'lg'} className="bg-destructive text-white font-semibold  mt-8">Remover del carrito <FaCartPlus size={18} className="ml-4" />  </Button>
  )
} 

