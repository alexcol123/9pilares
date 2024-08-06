'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { testingAction } from '@/utils/actions'
import { SubmitButton } from '@/components/myComponents/form/Buttons'
import FormTest from '@/components/myComponents/form/FormTest'


const CrearPerfilPage = () => {



  const { pending } = useFormStatus()

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>new user</h1>
      <div className='border p-8 rounded-md max-w-lg'>

        {/* <form action={createPerfilAction }>
          <div className="mb-2">
            <Label htmlFor='firstName'>First Name</Label>
            <Input id='firstName' name='firstName' type='text' />
          </div>

   <SubmitButton text='Create' />
        </form> */}

        <FormTest action={testingAction} />

      </div>
    </section>
  )
}
export default CrearPerfilPage