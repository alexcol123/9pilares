import { SubmitButton } from "@/components/myComponents/form/Buttons"
import FormContainer from "@/components/myComponents/form/FormContainer"

import FormInput from "@/components/myComponents/form/FormInput"
import { createProfileAction } from "@/utils/actions"





async function CreateProfile() {


  return (
    <section className="w-full">
      <h1 className='text-2xl font-semibold mb-8 capitalize'>new user</h1>
      <div className='border p-8 rounded-md '>
        <FormContainer action={createProfileAction}>
          <div className='grid gap-4 md:grid-cols-2 mt-4 '>
            <FormInput type='text' name='firstName' label='First Name' />
            <FormInput type='text' name='lastName' label='Last Name' />
            <FormInput type='text' name='username' label='Username' />
          </div>
          <SubmitButton text='Create Profile' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  )
}
export default CreateProfile