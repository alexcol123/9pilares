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
import React from "react"
import { MdDeleteForever } from "react-icons/md";




const MyAlertDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' size={'icon'}>
          <MdDeleteForever size={24}  className="text-destructive"/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Estas seguro De Borrar Este Producto? </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y eliminará tus datos de nuestros servidores.

          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction>
            {children}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default MyAlertDialog