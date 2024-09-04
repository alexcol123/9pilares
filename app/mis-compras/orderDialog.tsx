import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { productolist } from "./page"
import ListaDeProductos from "@/components/myComponents/home/ListaDeProductos"
import { list } from "postcss"
import { formatCurrency } from "@/utils/format"
import Image from "next/image"
import Link from "next/link"
import { FaRegEye } from "react-icons/fa6";


export function OrderDialog({ listaDeProductos, ordenId }: { listaDeProductos: productolist[], ordenId: string }) {


  return (

    <DialogComponent listaDeProductos={listaDeProductos} />

  )
}


export function DialogComponent({ listaDeProductos }: { listaDeProductos: productolist[] }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button   size={'icon'} className="bg-gray-800 text-white border border-primary"> 
          <FaRegEye  size={18}/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Productos que Ordenaste</AlertDialogTitle>
          <AlertDialogDescription>
            {listaDeProductos.map((producto) => {

         
              return <div key={producto.id}>
                <Link href={'/productos/' + producto.id} target="_blank" >



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

                </Link>
              </div>
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>

          <AlertDialogAction>Cerrar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

