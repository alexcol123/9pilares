
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function ListaVacia({
  encabezado = 'No hay productos que cumplan tu búsqueda.',
  mensaje = 'Continúa explorando nuestras otros productos.',
  textoBoton = 'volver a inicio',
  btnLink = '/'
}: {
  encabezado?: string
  mensaje?: string
  textoBoton?: string
  btnLink?: string
}) {
  return (
    <div className='flex flex-col items-center justify-center mt-10  '>
      <div className="flex flex-col items-center justify-center border w-fit p-4 rounded-md  gap-4 bg-muted">
        <h2 className='text-xl font-bold '>{encabezado}</h2>
        <p className='text-lg'>{mensaje}</p>
        <Button asChild className='mt-4 capitalize' size='lg'>
          <Link href={btnLink  }>{textoBoton}</Link>
        </Button>
      </div>
    </div>
  )
}
export default ListaVacia