'use client'

import { useFormState } from 'react-dom'
import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { SubmitButton } from './Buttons'

export type actionFunction = (prevState: any, formData: FormData) =>
  Promise<{ message: string }>


const initialState = {
  message: '',
}

function FormTest({ action, children, }: {
  action: actionFunction
  children?: React.ReactNode
}) {
  const [state, formAction] = useFormState(action, initialState)
  const { toast } = useToast()


  useEffect(() => {
    if (state.message) {
      toast({ description: state.message })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  console.log(state)

  return <form action={formAction}>
    <div className="mb-2">
      <Label htmlFor='firstName'>First Name</Label>
      <Input id='firstName' name='firstName' type='text' />
    </div>

    <SubmitButton text='Create' />
  </form>
}
export default FormTest