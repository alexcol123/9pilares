
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
import { fetchMisVentas } from '@/utils/actions'
import Image from 'next/image'



async function MisVentasPage() {
  const misVentas = await fetchMisVentas()

  const { ventasStats, misProductosConVentas } = misVentas
  const { _count, _sum } = ventasStats

  const cantidadVendida = _sum?.vendidos || 0
  const ordenes = _count?.id || 0

  // ventasStats: { _count: { id: 3 }, _sum: { vendidos: 7 } },
  console.log(_count, _sum)

  let totalEnDineroDeVentas = misProductosConVentas.reduce((acc, p) => {
    return acc + (p?.precio ?? 0) * (p?.vendidos ?? 0)
  }
    , 0)


  if (misProductosConVentas.length === 0) {
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
      <h4 className='mb-4 capitalize'>Ordenes: {ordenes} -  Cantidad Vendida: {cantidadVendida} - Total Ventas: {formatCurrency(totalEnDineroDeVentas)}</h4>
      <Table>
        <TableCaption>Todas tus ventas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre </TableHead>
            <TableHead>Foto </TableHead>
            <TableHead>Precio </TableHead>
            <TableHead>Vendidos</TableHead>
            <TableHead>Total $</TableHead>
            <TableHead>Inventario Qty</TableHead>

            <TableHead>Acciones</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {misProductosConVentas.map((p) => {

            let totalVentasEsteProducto = (p?.precio ?? 0) * (p?.vendidos ?? 0);
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

                <TableCell>{p.vendidos}</TableCell>


                <TableCell>{formatCurrency(totalVentasEsteProducto)}</TableCell>
                <TableCell>{p.cantidad}</TableCell>

                <TableCell className='flex items-center gap-x-3 mt-2'>
                  <Link href={`mis-productos/${p.id}/edit`}>
                    <IconButton actionType='edit'></IconButton>
                  </Link>

                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}



export default MisVentasPage