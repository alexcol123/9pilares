import LoadingCards from '@/components/myComponents/card/LoadingCards'
import ContenedorDeProductos from '@/components/myComponents/home/ContenedorDeProductos'
import ListaDeCategorias from '@/components/myComponents/home/ListaDeCategorias'
import ListaDeProductos from '@/components/myComponents/home/ListaDeProductos'
import { Button } from '@/components/ui/button'
import { Suspense } from 'react'

function Home({ searchParams }: { searchParams: { categoria: string, search: string } }) {
  return (

    // console.log(searchParams),

    <section>
      <ListaDeCategorias
        categoria={searchParams.categoria}
        search={searchParams.search}
      />


      <Suspense fallback={<LoadingCards />}>

        <ContenedorDeProductos
          categoria={searchParams.categoria}
          search={searchParams.search}
        />
      </Suspense>

    </section>

  )
}
export default Home