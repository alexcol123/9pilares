

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

import ListaVacia from '@/components/myComponents/home/ListaVacia'
import { AdminchangeDeliveryStatusAction, fetchAllOrdenes } from '@/utils/actions'

import { Button } from '@/components/ui/button'
import { OrderDialog } from '@/app/mis-compras/orderDialog'
import { SubmitButton } from '@/components/myComponents/form/Buttons'
import FormSelect from '@/components/myComponents/form/FormSelect'
import { Input } from '@/components/ui/input'




async function AdminAllOrders() {
  const todasLasOrdenes = await fetchAllOrdenes()

  if (todasLasOrdenes.length === 0) {
    return (
      <ListaVacia
        encabezado='No hay ordernes'
        mensaje='Promueve to negocio para que puedas tener mas ventas'
        textoBoton='Volver a casa'
        btnLink='/'
      />
    )
  }

  // const { ventasStats, misProductosConVentas } = misVentas
  // const { _count, _sum } = ventasStats

  // const cantidadVendida = _sum?.vendidos || 0
  // const ordenes = _count?.id || 0

  // // ventasStats: { _count: { id: 3 }, _sum: { vendidos: 7 } },
  // console.log(_count, _sum)

  // let totalEnDineroDeVentas = misProductosConVentas.reduce((acc, p) => {
  //   return acc + (p?.precio ?? 0) * (p?.vendidos ?? 0)
  // }
  //   , 0)


  // if (misProductosConVentas.length === 0) {
  //   return (
  //     <ListaVacia
  //       encabezado='No hay ordernes'
  //       mensaje='Promueve to negocio para que puedas tener mas ventas'
  //       textoBoton='Volver a casa'
  //       btnLink='/'
  //     />
  //   )
  // }



  return (
    <div className='mt-16'>



      {/* <div>
        <div className=" mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
          <StatsCards title="ordenes" value={ordenes || 0} />
          <StatsCards title="Cantidad Vendida" value={cantidadVendida || 0} />
          <StatsCards title="Total Ventas " value={formatCurrency(totalEnDineroDeVentas) || 0} />
        </div>
      </div> */}


      <Table>
        <TableCaption>Todas Las Ordenes </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id  </TableHead>

            <TableHead>Pago </TableHead>
            <TableHead>Productos</TableHead>
            <TableHead>Total $</TableHead>

            <TableHead>Envio </TableHead>

            <TableHead>Aciones </TableHead>


          </TableRow>
        </TableHeader>
        <TableBody>
          {todasLasOrdenes.map((orden) => {

            // pending
            // processing
            // shipped
            // delivered

            const listaDeProductos = JSON.parse(orden.products)

            return <TableRow key={orden.id}>
              <TableCell>{orden.id}</TableCell>
              <TableCell>{orden.paymentStatus ? <div className="text-green-500 font-semibold"> Completado </div> : <div className="text-primary font-semibold"> Procesando </div>}</TableCell>
              <TableCell>
                <OrderDialog listaDeProductos={listaDeProductos} ordenId={orden.id} />
              </TableCell>
              <TableCell>{formatCurrency(orden.amount)}</TableCell>
              <TableCell>


                {orden.deliveryStatus === 'pending'
                  ? <Button size='sm' variant='secondary'>Pending</Button>
                  : orden.deliveryStatus === 'processing'
                    ? <Button size='sm' variant='destructive'>Processing</Button>
                    : orden.deliveryStatus === 'shipped'
                      ? <Button size='sm' className='bg-yellow-500'>Shipped</Button>
                      : orden.deliveryStatus === 'delivered'
                        ? <Button size='sm' className='bg-green-500'>Delivered</Button>
                        : <Button size='sm' variant='destructive'>Unknown</Button>
                }





              </TableCell>
              <TableCell>

                <AdminFormAction productId={orden.id} />

              </TableCell>
            </TableRow>
          }
          )}
        </TableBody>
      </Table>
    </div>
  )
}

const AdminFormAction = ({ productId }: { productId: string }) => {

  // const changeDeliveryStatus = AdminchangeDeliveryStatusAction.bind(null, { ordenId: productId, newStatus: 'delivered' })
  return (
    <FormContainer action={AdminchangeDeliveryStatusAction} >

      <Input name='id' type='hidden' value={productId} />

      <FormSelect name='deliveryStatus' label='Cambiar Estado' list={[
        { name: 'pending' },
        { name: 'processing' },
        { name: 'shipped' },
        { name: 'delivered' },
      ]} />


      <SubmitButton  size='sm' />
    </FormContainer>
  )
}

export default AdminAllOrders