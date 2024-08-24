import ProductCard from "../card/ProductCard"

export type ProductCardTypes = {
  id: string,
  nombre: string,
  tagline: string,
  descripcion: string,
  precio: number,
  precioElevado: number,
  categoria: string,
  imagenes: string[],
  cantidad?: number | null,
  onSale: boolean,
  outOfStock: boolean,
  perfil: {
    nombre: string,
    imagenPerfil: string
  } | null,
} | null



const ListaDeProductos = ({ productos }: { productos: ProductCardTypes[] }) => {



  return (
    <section className='mt-4 gap-8 grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 
     grid-flow-row auto-rows-max 
       '>

      {productos.map((producto) => {


        return <ProductCard key={producto?.id} producto={producto} />
      })}


    </section>
  )
}
export default ListaDeProductos