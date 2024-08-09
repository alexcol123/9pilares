import { fetchAllProducts } from "@/utils/actions"
import ListaVacia from "./ListaVacia"
import ListaDeProductos from "./ListaDeProductos"

const ContenedorDeProductos = async ({ categoria, search }: { categoria?: string, search?: string }) => {


  const productos = await fetchAllProducts({ categoria, search })
   console.log(productos)
  if (productos.length === 0) {
    return <ListaVacia />
  }



  return (
  <ListaDeProductos productos={productos} />
  )
}
export default ContenedorDeProductos