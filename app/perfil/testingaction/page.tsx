'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { testingAction } from '@/utils/actions'
import { SubmitButton } from '@/components/myComponents/form/Buttons'
import FormTest from '@/components/myComponents/form/FormTest'


const TestingActionsPage = () => {

  const { pending } = useFormStatus()

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>Testing Actions</h1>
      <div className='border p-8 rounded-md max-w-lg'>

        <FormTest action={testingAction} />

      </div>
    </section>
  )
}
export default TestingActionsPage