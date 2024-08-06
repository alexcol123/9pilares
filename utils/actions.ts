'use server'

export const testingAction = async (prevState: any,
  formData: FormData) => {


  const firstName = formData.get('firstName') as string
  console.log(firstName)
  // create a 2 second delay to simulate a server request
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return { message: `Profile created for: ${firstName}`,  }
}