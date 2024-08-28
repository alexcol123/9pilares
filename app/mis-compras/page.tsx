// import EmptyList from '@/components/home/EmptyList'
// // import CountryFlagAndName from '@/components/card/CountryFlagAndName'
// import Link from 'next/link'

import ListaVacia from "@/components/myComponents/home/ListaVacia"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { borrarOrdenAction, fetchOrdenes } from "@/utils/actions"
import { formatCurrency, formatDate } from "@/utils/format"

import { OrderDialog } from "./orderDialog"

import { Button } from "@/components/ui/button"
import { FaTrashAlt } from "react-icons/fa";
import { IconButton } from "@/components/myComponents/form/Buttons"
import FormContainer from "@/components/myComponents/form/FormContainer"


// import { formatDate, formatCurrency } from '@/utils/format'
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'

// import FormContainer from '@/components/form/FormContainer'
// import { IconButton } from '@/components/form/Buttons'
// import { fetchBookings, deleteBookingAction } from '@/utils/actions'
// import LoadingTable from '@/components/booking/LoadingTable'

export type productolist = {
  id: string,
  nombre: string,
  tagline: string,
  descripcion: string,
  precio: number,
  precioElevado: number,
  categoria: string,
  imagenes: [
    'https://muzktffclydvmgtjbsqe.supabase.co/storage/v1/object/public/9pilares/1724776737762-S2d068064a0e0491493a4b91ec8513702J.webp',
    'https://muzktffclydvmgtjbsqe.supabase.co/storage/v1/object/public/9pilares/1724776737762-S5e561ba68cff464b819073188d2733ebT.webp',
    'https://muzktffclydvmgtjbsqe.supabase.co/storage/v1/object/public/9pilares/1724776737763-S5719e1d6f3e04cd59c1f3ea1602388eb9.webp'
  ],
  cantidad: number,
  onSale: boolean,
  outOfStock: boolean,
  Perfil: {
    nombre: string,
    imagenPerfil: string
  },
  cantidadParaComprar: number,
  precioReal: number
}


async function MisComprasPagina() {
  const misOrdenes = await fetchOrdenes()
  if (misOrdenes.length === 0) {
    return < ListaVacia encabezado='No hay ordenes aun .' mensaje='Continúa explorando nuestras otros productos.' textoBoton='volver a inicio' />

  }

  // return


  return <div className='mt-16'>
    <h4 className='mb-4 capitalize'>total bookings : {misOrdenes.length}</h4>
    <Table>
      <TableCaption>A list of your recent bookings.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha Creada</TableHead>
          <TableHead>Orden Id</TableHead>
          <TableHead>Total Pagado</TableHead>
          <TableHead>Estatus Envio</TableHead>
          <TableHead>Productos Ordenados</TableHead>

          <TableHead> Delete Order</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {misOrdenes.map((orden) => {



          const { id, amount, deliveryStatus, products, createdAt, perfilId } = orden

          const listaDeProductos = JSON.parse(products)

          const creada = formatDate(createdAt)

          return (
            <TableRow key={id}>


              <TableCell className="">{creada}</TableCell>
              <TableCell>{id}</TableCell>
              <TableCell>{formatCurrency(amount)}</TableCell>
              <TableCell>{deliveryStatus}</TableCell>
              <TableCell>
                <OrderDialog listaDeProductos={listaDeProductos} ordenId={id} />
              </TableCell>
              <TableCell>
                <BorrarOrder ordenId={id} />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>

  </div>
}


function BorrarOrder({ ordenId }: { ordenId: string }) {

  const borrarOrder = borrarOrdenAction.bind(null, { ordenId })

  return (
    <FormContainer action={borrarOrder}>
      <IconButton actionType="delete" />
    </FormContainer>
  )
}


export default MisComprasPagina