'use client'

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/utils/store"

import { FaCartPlus } from "react-icons/fa"

import { toast } from "@/components/ui/use-toast"




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

export const RemoveOneProduct = ({ producto }: { producto: any }) => {
  const removerProducto = useCartStore((state) => state.removerProducto)
  return (
    <Button
      onClick={() => [removerProducto(producto.id),
      toast({
        title: 'Producto eliminado del carrito:',
        description: producto.nombre
      })
      ]}
      size={'lg'} className="bg-destructive text-white font-semibold  mt-8">remover Producto <FaCartPlus size={18} className="ml-4" />  </Button>
  )
}

export const RemoverTodosProductosBtn = () => {

  const removerTodosProductos = useCartStore((state) => state.limpiarCarrito)

  return <Button
    onClick={() => [removerTodosProductos(), toast({
      title: 'Carrito eliminado',
      description: 'Todos los productos han sido eliminados del carrito'
    })
    ]}
    size={'lg'} className="bg-destructive text-white font-semibold  mt-8">remover todo <FaCartPlus size={18} className="ml-4" />  </Button>

}


export const MenosUnoBtn = ({ producto }: { producto: any }) => {
  const removerUnoDelProducto = useCartStore((state) => state.removerUnoDelProducto)


  return <Button
    onClick={() => [removerUnoDelProducto(producto.id), toast({
      title: 'Cantidad -1:',
      description: producto.nombre
    })
    ]}
    size={'lg'} className="bg-green-500 text-white font-semibold  mt-8"> -  </Button>
}

export const MasUnoBtn = ({ producto }: { producto: any }) => {
  const agregarUnoDelProducto = useCartStore((state) => state.agregarUnoDelProducto)

  return <Button
    onClick={() => [agregarUnoDelProducto(producto.id), toast({
      title: 'Cantidad +1:',
      description: producto.nombre
    })
    ]}
    size={'lg'} className="bg-green-500 text-white font-semibold  mt-8"> + </Button>
}



