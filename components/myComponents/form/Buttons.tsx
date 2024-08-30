
'use client'

import { IoReload } from "react-icons/io5";

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'


import { SignInButton } from '@clerk/nextjs'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { LuTrash2, LuPenSquare } from 'react-icons/lu'
import { useCartStore } from '@/utils/store'

type btnSize = 'default' | 'sm' | 'lg'
type SubmitButtonProps = {
  className?: string
  text?: string,
  size?: btnSize
}




type actionType = 'edit' | 'delete'

export const IconButton = ({ actionType, iconSize }: { actionType: actionType, iconSize?: number }) => {
  const { pending } = useFormStatus()

  const renderIcon = () => {
    switch (actionType) {
      case 'edit':
        return <LuPenSquare size={iconSize || 16} />
      case 'delete':
        return <LuTrash2 size={iconSize || 16} />
      default:
        const never: never = actionType
        throw new Error(`Invalid action type: ${never}`)
    }
  }

  return (
    <Button
      type='submit'
      size='icon'
      variant='link'
      className='p-2 cursor-pointer text-primary-foreground'
    >
      {pending ? <IoReload className=' animate-spin' size={iconSize || 16} /> : renderIcon()}
    </Button>
  )
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
        ? <>  <IoReload className='mr-2 h-4 w-4 animate-spin' /> Please Wait</>
        : text}
    </Button>
  )
}


export const CardSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button
        type='button'
        size='icon'
        variant='outline'
        className='p-2 cursor-pointer'
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  )
}


export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus()

  return <Button type='submit' size='icon' variant='outline' className=' cursor-pointer bg-muted '>
    {pending ? <IoReload className='mr-2 h-4 w-4 animate-spin' />
      : isFavorite
        ? <FaHeart size={21} className=' text-destructive' />
        : <FaRegHeart size={21} className='' />}
  </Button>

}
