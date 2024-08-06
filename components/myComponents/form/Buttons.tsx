
'use client'

import { ReloadIcon } from '@radix-ui/react-icons'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'


import { SignInButton } from '@clerk/nextjs'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { LuTrash2, LuPenSquare } from 'react-icons/lu'


type btnSize = 'default' | 'sm' | 'lg'
type SubmitButtonProps = {
  className?: string
  text?: string,
  size?: btnSize
}


export const SubmitButton = ({ className = '', text = 'submit', size = 'lg' }: SubmitButtonProps) => {

  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className={`capitalize ${className}`}
      size={size}
    >
      {pending
        ? <>  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> Please Wait</>
        : text}
    </Button>
  )
}