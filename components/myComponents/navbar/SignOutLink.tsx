'use client'

import { useToast } from '@/components/ui/use-toast'
import { SignOutButton } from '@clerk/nextjs'

const SignOutLink = () => {

  const { toast } = useToast()

  const handleLogout = () => {
    toast({ description: 'You have sign out. ' })
  }

  return (
    <SignOutButton redirectUrl='/'>
      <button onClick={handleLogout}>Sign out</button  >
    </SignOutButton>
  )
}
export default SignOutLink