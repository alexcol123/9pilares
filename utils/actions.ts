'use server'

import { imageSchema, productoSchema, profileSchema, validateWithZodSchema } from './schemas'

import db from './db'
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadImage } from './supabase'

// local functions 
const getAuthUser = async () => {
  const user = await currentUser()
  if (!user) {
    throw new Error('You must be logged in to access this route')
  }

  if (!user.privateMetadata.tienePerfil) {
    redirect('/perfil/crear')
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
    if (!user) throw new Error('Please login to create a perfil')

    const rawData = Object.fromEntries(formData)

    // const validatedFields = profileSchema.parse(rawData)
    const validatedFields = validateWithZodSchema(profileSchema, rawData)

    await db.perfil.create({
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

  const perfil = await db.perfil.findFirst({
    where: { clerkId: user.id },
    select: { imagenPerfil: true },
  })

  return perfil?.imagenPerfil

}


export const fetchProfile = async () => {
  const user = await getAuthUser()

  const perfil = await db.perfil.findUnique({
    where: {
      clerkId: user.id,
    },
  })
  if (!perfil) return redirect('/perfil/create')
  return perfil
}


export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {


  const user = await getAuthUser()

  try {
    const rawData = Object.fromEntries(formData)

    const validatedFileds = profileSchema.parse(rawData)

    await db.perfil.update({
      where: { clerkId: user.id },
      data: validatedFileds,
    })

    revalidatePath('/perfil')
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

    const fullPath = await uploadImage(validatedFields.image)

    await db.perfil.update({
      where: {
        clerkId: user.id,
      },
      data: {
        imagenPerfil: fullPath,
      },
    })
    revalidatePath('/perfil')
    return { message: 'Imagend de perfil actualizada' }
  } catch (error) {
    return renderError(error)
  }
}

// Productos

export const createProductoAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser()
  try {
    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(productoSchema, rawData)

    // await db.producto.create({
    //   data: {
    //     ...validatedFields,
    //     perfilId: user.id,
    //   },
    // })

    // revalidatePath('/productos')
    return { message: 'Producto creado' }
  } catch (error) {
    return renderError(error)
  }
  redirect('/')
}