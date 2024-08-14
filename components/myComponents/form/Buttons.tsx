
'use client'

import { ReloadIcon } from '@radix-ui/react-icons'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'


import { SignInButton } from '@clerk/nextjs'
import { FaRegHeart, FaHeart } from 'react-icons/fa'


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
    {pending ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
      : isFavorite
        ? <FaHeart size={21} className=' text-destructive' />
        : <FaRegHeart size={21} className='' />}
  </Button>

}
