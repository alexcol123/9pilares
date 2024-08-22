'use client'

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/utils/store";
import { BsCartFill } from "react-icons/bs";
import { useRouter } from 'next/navigation'

const CartIcon = () => {
  const router = useRouter()

  const { cantidadArticulos } = useCartStore(state => state)

  return (
    <div className="bg-secondary rounded-md  mx-4 group  transition duration-500">
      <Button
        type='button'
        size='icon'
        variant='link'
        className='p-2 cursor-pointer relative  group-hover:bg-primary transition duration-500 '
        onClick={() => {
          router.push('/carrito')
        }}

      >
        <BsCartFill size={20} className='text-white' />

        <span className='absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full px-1 group-hover:bg-green-600 group-hover:transition group-hover:duration-500'>{cantidadArticulos}</span>
      </Button>
    </div>
  )
}
export default CartIcon