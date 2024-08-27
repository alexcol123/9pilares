'use client'

import { SubmitButton } from "@/components/myComponents/form/Buttons"
import FormContainer from "@/components/myComponents/form/FormContainer"
import { Button } from "@/components/ui/button"
import { crearOrdenAction } from "@/utils/actions"


import { useCartStore } from "@/utils/store"
import { useAuth, SignInButton } from "@clerk/nextjs"


const CheckoutPage = () => {
  const { userId } = useAuth()

  const listaDeProductos = useCartStore(state => state.listaDeProductos)


  const crearOrder = crearOrdenAction.bind(null, {
    listaDeProductos
  })



  if (!userId) {
    return (
      <div className="flex  items-center justify-center mt-80 w-full ">
        <div className="flex flex-col items-center justify-center w-fit rounded-xl bg-muted border  p-10 ">
          <h2 className="text-xl mb-10  ">Registrate para continuar 😉</h2>
          <SignInButton mode="modal">
            <Button>
              Registrate para continuar
            </Button>
          </SignInButton>
        </div>
      </div>
    )
  }




  return (
    <section>
      <FormContainer action={crearOrder}>
        <SubmitButton text="Hacer Pago" className="w-full" />
      </FormContainer>
    </section>
  )
}
export default CheckoutPage