import ContenedorDeProductos from '@/components/myComponents/home/ContenedorDeProductos'
import ListaDeCategorias from '@/components/myComponents/home/ListaDeCategorias'
import ListaDeProductos from '@/components/myComponents/home/ListaDeProductos'
import { Button } from '@/components/ui/button'

function Home({ searchParams }: { searchParams: { categoria: string, search: string } }) {
  return (

    // console.log(searchParams),

    <section>
      <ListaDeCategorias
        categoria={searchParams.categoria}
        search={searchParams.search}
      />

      <ContenedorDeProductos
        categoria={searchParams.categoria}
        search={searchParams.search}
      />
    </section>

  )
}
export default Home