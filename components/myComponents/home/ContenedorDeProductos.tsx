import { fetchAllProducts } from "@/utils/actions"
import ListaVacia from "./ListaVacia"
import ListaDeProductos from "./ListaDeProductos"

const ContenedorDeProductos = async ({ categoria, search }: { categoria?: string, search?: string }) => {


  let productos = await fetchAllProducts({ categoria, search })

  if (productos.length === 0) {
    return <ListaVacia />
  }

  productos = productos.map(producto => ({
    ...producto,
    perfil: producto.Perfil || null
  }));



  return (
  <ListaDeProductos productos={productos} />
  )
}
export default ContenedorDeProductos