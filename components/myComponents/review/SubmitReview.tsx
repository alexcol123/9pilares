'use client'
import { useState } from 'react'
import { SubmitButton } from '@/components/myComponents/form/Buttons'
import FormContainer from '@/components/myComponents/form/FormContainer'
import { Card } from '@/components/ui/card'
import RatingInput from '@/components/myComponents/form/RatingInput'
import TextAreaInput from '@/components/myComponents/form/FormTextAreaInput'
import { Button } from '@/components/ui/button'
import { createReviewAction } from '@/utils/actions'

function SubmitReview({ productoId }: { productoId: string }) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false)
  return (
    <div className='mt-8'>
      <Button onClick={() => setIsReviewFormVisible((prev) => !prev)}>
       Dejar un review 
      </Button>
      {isReviewFormVisible && (
        <Card className='p-8 mt-8'>
          <FormContainer action={createReviewAction}>
            <input type='hidden' name='productoId' value={productoId} />
            <RatingInput name='rating' />
            <TextAreaInput
              name='comment'
              labelText='Que opinas de este producto?'
              defaultValue='me encanta este producto, es increible'
            />
            <SubmitButton text='Submit' className='mt-4' />
          </FormContainer>
        </Card>
      )}
    </div>
  )
}

export default SubmitReview