import { sub } from 'date-fns'
import { stat } from 'fs'
import { list } from 'postcss'
import { create } from 'zustand'

import { persist } from "zustand/middleware"

type ProductoType = {
  imagenes: any
  id: number
  nombre: string
  precio: number
  cantidadParaComprar: number
}



type State = {
  listaDeProductos: ProductoType[]
  subTotal: number
  total: number
  cantidadArticulos: number

}

type Actions = {
  agregarProducto: (producto: ProductoType) => void
  removerProducto: (id: number) => void
  limpiarCarrito: () => void
  removerUnoDelProducto: (id: number) => void
  agregarUnoDelProducto: (id: number) => void
}



const initialState: State = {
  listaDeProductos: [],
  subTotal: 0,
  total: 0,
  cantidadArticulos: 0,

}
const taxRate = 1.1 // 10% tax

const getIsProductOnCart = (productos: ProductoType[], id: number) => productos.find((p) => p.id === id)

const calculateTotals = (productos: ProductoType[]) => {
  const subTotal = productos.reduce((acc, producto) => acc + producto.precio * producto.cantidadParaComprar, 0);
  const total = subTotal * taxRate;
  const cantidadArticulos = productos.reduce((acc, producto) => acc + producto.cantidadParaComprar, 0);

  return { subTotal, total, cantidadArticulos };
};

export const useCartStore = create(persist<State & Actions>((set) => ({
  ...initialState,

  agregarProducto: (producto: ProductoType) => set((state: State & Actions) => {

    const isProductOnCart = getIsProductOnCart(state.listaDeProductos, producto.id)

    let todosLosProductos

    if (!isProductOnCart) {
      todosLosProductos = [...state.listaDeProductos, producto]

    } else {
      todosLosProductos = state.listaDeProductos.map((p) => {
        if (p.id === producto.id) {
          return {
            ...p,
            cantidadParaComprar: p.cantidadParaComprar += producto.cantidadParaComprar,
          }
        }
        return p
      }
      )
    }
    const { subTotal, total, cantidadArticulos } = calculateTotals(todosLosProductos);

    return { listaDeProductos: todosLosProductos, subTotal, total, cantidadArticulos };
  }),



  removerProducto: (id: number) => set((state: State & Actions) => {
    const todosLosProductos = state.listaDeProductos.filter((p) => p.id !== id)
    const { subTotal, total, cantidadArticulos } = calculateTotals(todosLosProductos);

    return { listaDeProductos: todosLosProductos, subTotal, total, cantidadArticulos };
  }
  ),

  removerUnoDelProducto: (id: number) => set((state: State & Actions) => {
    const isProductOnCart = getIsProductOnCart(state.listaDeProductos, id)

    let todosLosProductos
    if (!isProductOnCart) return state

    if (isProductOnCart.cantidadParaComprar > 1) {
      todosLosProductos = state.listaDeProductos.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            cantidadParaComprar: p.cantidadParaComprar -= 1,
          }
        }
        return p
      }
      )
      const { subTotal, total, cantidadArticulos } = calculateTotals(todosLosProductos);

      return { listaDeProductos: todosLosProductos, subTotal, total, cantidadArticulos };

    } else {
      todosLosProductos = state.listaDeProductos.filter((p) => p.id !== id)
    }


    const { subTotal, total, cantidadArticulos } = calculateTotals(todosLosProductos);

    return { listaDeProductos: todosLosProductos, subTotal, total, cantidadArticulos };
  }
  ),

  agregarUnoDelProducto: (id: number) => set((state: State & Actions) => {

    const isProductOnCart = getIsProductOnCart(state.listaDeProductos, id)

    if (!isProductOnCart) return state

    const todosLosProductos = state.listaDeProductos.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          cantidadParaComprar: p.cantidadParaComprar += 1,
        }
      }
      return p
    }
    )

    const { subTotal, total, cantidadArticulos } = calculateTotals(todosLosProductos);

    return { listaDeProductos: todosLosProductos, subTotal, total, cantidadArticulos };
  }
  ),


  limpiarCarrito: () => set(initialState)

}),


  {
    name: 'cart-storage',
  }

))

