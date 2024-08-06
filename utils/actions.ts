'use server'

import { profileSchema } from './schemas'

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

    const rawData = Object.fromEntries(formData)

    const validatedFields = profileSchema.parse(rawData)
    // console.log(validatedFields)
    return { message: 'Profile Created' }
  } catch (error) {
    console.log(error)
    return { message: 'there was an error...' }
  }
}