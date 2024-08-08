'use client'
import { useState } from 'react'

import FormContainer from './FormContainer'
import ImageInputWithPreview from './ImageInputWithPreview'
import { SubmitButton } from './Buttons'
import { type actionFunction } from '@/utils/types'


import { Button } from '@/components/ui/button'
import { FaMinus, FaPlus } from 'react-icons/fa'

type MultipleImageInputContainerProps = {
  name?: string
  action: actionFunction
  children?: React.ReactNode
  maximumImages: number
}


function MultipleImageInputContainer(props: MultipleImageInputContainerProps) {
  const { name, action, maximumImages = 4 } = props

  const [maxImages, setmaxImages] = useState([1])
  console.log(maxImages)

  const newImages = () => {

    maxImages.length < maximumImages
      ? setmaxImages([...maxImages, 1])
      : setmaxImages([...maxImages])
  }

  const removeImages = () => {

    maxImages.length === 1
      ? setmaxImages([...maxImages])
      : setmaxImages(maxImages.slice(0, maxImages.length - 1))

  }

  return (
    <div>
      <div className=' mt-4'>
        <FormContainer action={action}>
          {maxImages.map((_, index) => {
            return <ImageInputWithPreview inputName={`Imagen${index + 1}`} key={index}
              labelName={`Imagen ${index + 1}`}
              name={`${name}[${index}]`}
            />
          })}



          <div className="grid md:grid-cols-1 mt-14 gap-4  ">

            <div className='flex gap-5 w-full '>
              <Button
                type='button'
                size={'sm'}
                variant='default'
                className='p-2 cursor-pointer '
                onClick={newImages}
              >
                Agregar Mas<FaPlus className='inline-block ml-2' />
              </Button>



              <Button
                type='button'
                size={'sm'}
                variant='destructive'
                className='p-2 cursor-pointer '
                onClick={removeImages}
              >
                Remover Ultima<FaMinus className='inline-block ml-2' />
              </Button>
            </div>


            <div className='flex items-center justify-center w-full mt-10'>
              <SubmitButton size='lg' text='Submitir Imagenes' />
            </div>
          </div>



        </FormContainer>
      </div>


    </div>
  )
}
export default MultipleImageInputContainer