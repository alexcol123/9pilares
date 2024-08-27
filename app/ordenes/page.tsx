// import EmptyList from '@/components/home/EmptyList'
// // import CountryFlagAndName from '@/components/card/CountryFlagAndName'
// import Link from 'next/link'

import ListaVacia from "@/components/myComponents/home/ListaVacia"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchOrdenes } from "@/utils/actions"
import { formatCurrency, formatDate } from "@/utils/format"
import Image from "next/image"

import Link from "next/link"
import { boolean, number, string } from "zod"

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

type productolist = {
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


async function BookingsPage() {
  const misOrdenes = await fetchOrdenes()
  if (misOrdenes.length === 0) {
    return < ListaVacia />
  }

  // return


  return <div className='mt-16'>
    <h4 className='mb-4 capitalize'>total bookings : {misOrdenes.length}</h4>
    <Table>
      <TableCaption>A list of your recent bookings.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha Creada</TableHead>
          <TableHead>Id</TableHead>
          <TableHead>Costo</TableHead>
          <TableHead>Estatus Envio</TableHead>
          <TableHead>Productos Ordenados</TableHead>


        </TableRow>
      </TableHeader>
      <TableBody>
        {misOrdenes.map((orden) => {



          const { id, amount, deliveryStatus, products, createdAt, perfilId } = orden

          const listaDeProductos = JSON.parse(products)
          console.log(listaDeProductos)

          const creada = formatDate(createdAt)

          return (
            <TableRow key={id}>

              <TableCell>{creada}</TableCell>
              <TableCell>{id}</TableCell>
              <TableCell>{amount}</TableCell>
              <TableCell>{deliveryStatus}</TableCell>
              <TableCell className="w-[400px]">{
                <ScrollArea className="h-64  my-4 ">
                  {listaDeProductos.map((producto: productolist) => {
                    return (
                      <div className=" border m-2 p-2 rounded-xl bg-muted flex items-center justify-between gap-2" key={producto.id}>
                        <div>
                          <p>Nombre:{producto.nombre}</p>
                          <p>Precio:{formatCurrency(producto.precio)}</p>
                          <p>Cantidad {producto.cantidadParaComprar}</p>

                          <hr />
                          <p className="font-semibold">Total {formatCurrency(producto.cantidadParaComprar * producto.precio)}</p>
                        </div>
                        <Image src={producto.imagenes[0]} alt={producto.nombre} width={80} height={80} className="object cover rounded-xl" />
                      </div>
                    )
                  })}
                </ScrollArea>
              }</TableCell>





            </TableRow>
          )
        })}
      </TableBody>
    </Table>

  </div>




  // <div className='mt-16'>
  //   <h4 className='mb-4 capitalize'>total misOrdenes : {misOrdenes.length}</h4>
  //   <Table>
  //     <TableCaption>A list of your recent bookings.</TableCaption>
  //     <TableHeader>
  //       <TableRow>
  //         <TableHead>Vehicle Info</TableHead>
  //         <TableHead>Country</TableHead>
  //         <TableHead>Nights</TableHead>
  //         <TableHead>Total</TableHead>
  //         <TableHead>From</TableHead>
  //         <TableHead>To</TableHead>
  //         <TableHead>Actions</TableHead>
  //       </TableRow>
  //     </TableHeader>
  //     <TableBody>
  //       {bookings.map((booking) => {
  //         const { id, orderTotal, totalNights, checkIn, checkOut } = booking

  //         if (!booking.Vehicle) return null
  //         const { id: vehicleId, make, model, year } = booking.Vehicle

  //         const startDate = formatDate(checkIn)
  //         const endDate = formatDate(checkOut)
  //         return (
  //           <TableRow key={id}>
  //             <TableCell>
  //               <Link
  //                 href={`/vehicles/${vehicleId}`}
  //                 className='underline text-muted-foreground tracking-wide'
  //               >
  //                 {`${make} ${model} ${year}`}
  //               </Link>
  //             </TableCell>
  //             <TableCell>
  //               country or city
  //               {/* <CountryFlagAndName countryCode={country} /> */}
  //             </TableCell>
  //             <TableCell>{totalNights}</TableCell>
  //             <TableCell>{formatCurrency(orderTotal)}</TableCell>
  //             <TableCell>{startDate}</TableCell>
  //             <TableCell>{endDate}</TableCell>
  //             <TableCell>
  //               <DeleteBooking bookingId={id} />
  //             </TableCell>
  //           </TableRow>
  //         )
  //       })}
  //     </TableBody>
  //   </Table>

  // </div>

}

// function DeleteBooking({ bookingId }: { bookingId: string }) {
//   const deleteBooking = deleteBookingAction.bind(null, { bookingId })
//   return (
//     <FormContainer action={deleteBooking}>
//       <IconButton actionType='delete' />
//     </FormContainer>
//   )
// }

export default BookingsPage