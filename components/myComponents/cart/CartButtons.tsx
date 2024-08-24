'use client'

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/utils/store"

import { FaCartPlus } from "react-icons/fa"

import { toast } from "@/components/ui/use-toast"
import { BsCartX } from "react-icons/bs"


// type sizeTypes{
//   'sm' | 'md' | 'lg'  
// }

type sizeProps = 'sm' | 'lg'

export const AddToCartBtn = ({ producto, btnSize }: { producto: any, btnSize?: sizeProps }) => {

  producto.cantidadParaComprar = 1

  const agregarProducto = useCartStore((state) => state.agregarProducto)


  return (
    <Button
      type="button"
      size={btnSize || 'lg'}
      onClick={() =>
        [
          agregarProducto(producto),
          toast({
            title: 'Producto agregado al carrito:',
            description: producto.nombre
          })
        ]}

      className="bg-primary text-white font-semibold  ">
      Agregar al carrito <FaCartPlus size={18} className="ml-4" />
    </Button>
  )
}

export const RemoveOneProduct = ({ producto }: { producto: any }) => {
  const removerProducto = useCartStore((state) => state.removerProducto)
  return (
    <Button
      type="button"
      variant={'link'}
      onClick={() => [removerProducto(producto.id),
      toast({
        title: 'Producto eliminado del carrito:',
        description: producto.nombre
      })
      ]}
      className="p-0 opacity-50 text-secondary-foreground  "
      size={'sm'}

    >Remover  </Button>
  )
}

export const RemoverTodosProductosBtn = () => {

  const removerTodosProductos = useCartStore((state) => state.limpiarCarrito)

  return <Button
    type="button"
    className="hover:bg-destructive hover:text-white transition duration-300 "
    variant={'outline'}
    size={'sm'}
    onClick={() => [removerTodosProductos(), toast({
      title: 'Carrito eliminado',
      description: 'Todos los productos han sido eliminados del carrito'
    })
    ]}
  >Vaciar el carrito <BsCartX className=" ml-4  " size={16} /> </Button>

}


export const MenosUnoBtn = ({ producto }: { producto: any }) => {
  const removerUnoDelProducto = useCartStore((state) => state.removerUnoDelProducto)


  return <Button
    type="button"
    variant={'outline'}
    onClick={() => [removerUnoDelProducto(producto.id), toast({
      title: 'Cantidad -1:',
      description: producto.nombre

    })
    ]}
    size={'sm'} className="font-semibold  "> -  </Button>
}

export const MasUnoBtn = ({ producto }: { producto: any }) => {
  const agregarUnoDelProducto = useCartStore((state) => state.agregarUnoDelProducto)

  return <Button
    type="button"
    variant={'outline'}
    onClick={() => [agregarUnoDelProducto(producto.id), toast({
      title: 'Cantidad +1:',
      description: producto.nombre
    })
    ]}
    size={'sm'} className="font-semibold "> + </Button>
}



