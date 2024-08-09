import { fetchAllProducts } from "@/utils/actions"
import ListaVacia from "./ListaVacia"

const ContenedorDeProductos = async ({ categoria, search }: { categoria?: string, search?: string }) => {


  const productos = await fetchAllProducts({ categoria, search })
  // console.log(productos)
  if (productos.length === 0) {
    return <ListaVacia />
  }



  return (
    <div>ContenedorDeProductos</div>
  )
}
export default ContenedorDeProductos