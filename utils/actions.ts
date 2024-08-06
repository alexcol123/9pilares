'use server'

import { imageSchema, profileSchema, validateWithZodSchema } from './schemas'

import db from './db'
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// local functions 
const getAuthUser = async () => {
  const user = await currentUser()
  if (!user) {
    throw new Error('You must be logged in to access this route')
  }

  if (!user.privateMetadata.tienePerfil) {
    redirect('/profile/crear')
  }

  return user
}

const renderError = (error: unknown): { message: string } => {
  console.log(error)
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
  }
}

// Exported functions



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
    
    // const validatedFields = profileSchema.parse(rawData)
    const validatedFields = validateWithZodSchema(profileSchema, rawData)

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        imagenPerfil: user.imageUrl ?? '',
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
    select: { imagenPerfil: true },
  })

  return profile?.imagenPerfil

}


export const fetchProfile = async () => {
  const user = await getAuthUser()

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  })
  if (!profile) return redirect('/profile/create')
  return profile
}


export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {


  const user = await getAuthUser()

  try {
    const rawData = Object.fromEntries(formData)

    const validatedFileds = profileSchema.parse(rawData)

    await db.profile.update({
      where: { clerkId: user.id },
      data: validatedFileds,
    })

    revalidatePath('/profile')
    return { message: 'Profile updated successfully' }

  } catch (error) {

    return renderError(error)
  }
}


export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser()
  try {
    const image = formData.get('image') as File
    const validatedFields = validateWithZodSchema(imageSchema, { image })

    return { message: 'Profile image updated successfully' }
  } catch (error) {
    return renderError(error)
  }
}