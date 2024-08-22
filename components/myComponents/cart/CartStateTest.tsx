'use client'

import { useCartStore } from "@/utils/store"

const CartStateTest = () => {
const { 
  listaDeProductos,
  subTotal,
  total,
  cantidadArticulos,
}= useCartStore(state =>state)



  return (
<div className="p-3 border rounded-xl bg-muted">
  <h1 className="text-lg">Cart State Test</h1>
  <h2>Subtotal: {subTotal}</h2>
  <h2>Total: {total}</h2>
  <h2>Cantidad de articulos: {cantidadArticulos}</h2>
  <h2>Lista de productos:</h2>
  <ul className="p-2 border   border-white rounded-xl flex flex-col items-center justify-between  ">
    {listaDeProductos.map((producto) => (
      <li key={producto.id}>
      Cantidad: {producto.cantidadParaComprar} Nombre:  {producto.nombre}   - Precio por Unidad :${producto.precio}
      </li>
    ))}
  </ul>
</div>
  )
}
export default CartStateTest