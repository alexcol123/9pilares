import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { LuAlignLeft } from 'react-icons/lu'
import Link from 'next/link'

import UserIcon from './UserIcon'
import { links } from '@/utils/links'

import { Button } from '@/components/ui/button'

import { SignedOut, SignedIn, SignInButton, SignUpButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { FaHome } from "react-icons/fa";
import SignOutLink from './SignOutLink'

function LinksDropdown() {



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex gap-4 max-w-[100px]'>
          <LuAlignLeft className='w-6 h-6' />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-52' align='start' sideOffset={10}>

        <SignedIn>



          <DropdownMenuItem >
            <Link href={'/'} className='capitalize w-full flex items-center gap-2'>
              Home
              <FaHome size={16} className='text-primary' />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {links.map((link) => {

            // if (link.label === 'admin' && !isAdmin) {
            //   return null
            // }

            return (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className='capitalize w-full'>
                  {link.label}
                </Link>
              </DropdownMenuItem>
            )
          })}

          <DropdownMenuSeparator />
          <DropdownMenuItem className='bg-primary text-primary-foreground'>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>


        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode='modal'>
              <button className='w-full text-left'>Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode='modal'>
              <button className='w-full text-left'>Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>



      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default LinksDropdown