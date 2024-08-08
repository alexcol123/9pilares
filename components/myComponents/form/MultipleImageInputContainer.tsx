'use client'
import { useState } from 'react'
import Image from 'next/image'

import FormContainer from './FormContainer'
import ImageInput from './ImageInput'
import { SubmitButton } from './Buttons'
import { type actionFunction } from '@/utils/types'
import { LuUser2 } from 'react-icons/lu'

import { CiImageOn } from "react-icons/ci";

import { Button } from '@/components/ui/button'
import { FaMinus, FaPlus } from 'react-icons/fa'

type MultipleImageInputContainerProps = {
  image?: string
  name?: string
  action: actionFunction
  text: string
  children?: React.ReactNode
  multipleImages?: boolean
  isProfile?: boolean
  inputName?: string
}


function MultipleImageInputContainer(props: MultipleImageInputContainerProps) {
  const { image, name, action, text, multipleImages, isProfile = false, inputName } = props

  // create images from url


  // const [isUpdateFormVisible, setUpdateFormVisible] = useState(false)

  const [maxImages, setmaxImages] = useState([1])

  const newImages = () => {

    maxImages.length < 4
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

      <div className='max-w-lg mt-4'>
        <FormContainer action={action}>
          {maxImages.map((_, index) => {
            return <ImageInput inputName={`Imagen${index + 1}`} multipleImages={multipleImages} key={index}
              labelName={`Imagen ${index + 1}`}
              name={`${name}[${index}]`}
            />
          })}
          {/* <ImageInput inputName={inputName} multipleImages={multipleImages} />
          <ImageInput inputName={'test'} multipleImages={multipleImages} /> */}
          {/* <SubmitButton size='sm' /> */}


          <div className="flex gap-6">

            <Button
              type='button'
              size={'sm'}
              variant='default'
              className='p-2 cursor-pointer my-6'
              onClick={newImages}
            >
              Agregar Mas<FaPlus className='inline-block ml-2' />
            </Button>



            <Button
              type='button'
              size={'sm'}
              variant='destructive'
              className='p-2 cursor-pointer my-6'
              onClick={removeImages}
            >
              Remover Ultima<FaMinus className='inline-block ml-2' />
            </Button>
          </div>

          <div className='mt-16 w-full'>
            <SubmitButton size='lg' text='Submitir Imagenes ahora' />
          </div>

        </FormContainer>
      </div>


    </div>
  )
}
export default MultipleImageInputContainer