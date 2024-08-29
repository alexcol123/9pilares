
// import { fetchRentals, deleteRentalAction } from '@/utils/actions'
import Link from 'next/link'

import { formatCurrency } from '@/utils/format'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import FormContainer from '@/components/myComponents/form/FormContainer'
import { IconButton } from '@/components/myComponents/form/Buttons'
import ListaVacia from '@/components/myComponents/home/ListaVacia'
import { deleteProductAction, fetchMisProductos } from '@/utils/actions'
import Image from 'next/image'



async function MisProductosPage() {
  const misProductos = await fetchMisProductos()



  if (misProductos.length === 0) {
    return (
      <ListaVacia
        encabezado='No hay creado productos'
        mensaje='Crea un producto para poder verlo aquí'
        textoBoton='Crear Producto'
        btnLink='/mis-productos/crear'
      />
    )
  }



  return (
    <div className='mt-16'>
      <h4 className='mb-4 capitalize'>Mis Productos  : {misProductos.length}</h4>
      <Table>
        <TableCaption>Todos tus productos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre </TableHead>
            <TableHead>Foto </TableHead>
            <TableHead>Precio </TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Vendidos</TableHead>
            <TableHead>Acciones</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {misProductos.map((p) => {


            return (
              <TableRow key={p.id}>
                <TableCell>
                  <Link
                    href={`/productos/${p.id}`}
                    className='underline text-muted-foreground tracking-wide'
                  >
                    {p.nombre}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/productos/${p.id}`}>
                    <Image src={p.imagenes[0]} alt={p.nombre} width={70} height={70} className="object-cover rounded-md aspect-square" />
                  </Link>

                </TableCell>

                <TableCell>{formatCurrency(p.precio)}</TableCell>
                <TableCell>{p.cantidad}</TableCell>
                <TableCell>{p.vendidos}</TableCell>

                <TableCell className='flex items-center gap-x-3 mt-2'>
                   <Link href={`mis-productos/${p.id}/edit`}>
                    <IconButton actionType='edit'></IconButton>
                  </Link>
                  <BorrarProducto productId={p.id} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

function BorrarProducto({ productId }: { productId: string }) {
  const deleteProducto = deleteProductAction.bind(null, { productId })
  return (
    <FormContainer action={deleteProducto}>
      <IconButton actionType='delete' />
    </FormContainer>
  )
}

export default MisProductosPage