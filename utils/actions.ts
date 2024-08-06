'use server'

import { profileSchema } from './schemas'

import db from './db'
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'



export const testingAction = async (prevState: any,
  formData: FormData) => {

  console.log(formData)
  console.log('form data above this fking line -----------------')


  const firstName = formData.get('firstName') as string
  console.log(firstName)
  // create a 2 second delay to simulate a server request
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return { message: `Profile created for: ${firstName}`, }
}



export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {

    const user = await currentUser()
    if (!user) throw new Error('Please login to create a profile')

    const rawData = Object.fromEntries(formData)
    const validatedFields = profileSchema.parse(rawData)

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields,
      },
    })

    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        tienePerfil: true,
      },
    })

  } catch (error) {
    console.log(error)
    return { message: 'there was an error...' }
  }

  redirect('/')
}


export const fetchProfileImage = async () => {

  const user = await currentUser()
  if (!user) return null

  const profile = await db.profile.findFirst({
    where: { clerkId: user.id },
    select: { profileImage: true },
  })

  return profile?.profileImage

}