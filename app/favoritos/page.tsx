import ListaDeProductos from "@/components/myComponents/home/ListaDeProductos"
import ListaVacia from "@/components/myComponents/home/ListaVacia"
import { fetchFavorites } from "@/utils/actions"

const PaginaFavoritos = async () => {
  const favorites = await fetchFavorites()


  if (!favorites.length) { return <ListaVacia /> }

  return (


    <div>Comming soon</div>
    // <ListaDeProductos productos={favorites} />
  )
}
export default PaginaFavoritos