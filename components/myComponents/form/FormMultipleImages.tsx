
'use client'
import { Button } from "@/components/ui/button";
import ImageInput from "./ImageInput"
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { set } from "date-fns";



const FormMultipleImages = ({ name }: { name: string }) => {

  const [maxImages, setmaxImages] = useState([1])

  console.log(maxImages)

  const newImages = () => {

    maxImages.length < 6
      ? setmaxImages([...maxImages, 1])
      : setmaxImages([...maxImages])
  }



  return (
    <div className='grid md:grid-cols-1 gap-8 mb-4   items-center '>

      <div className="w-fit">

        <div className="mb-6">
          {maxImages.map((_, index) => {
            return <ImageInput key={index}
              labelName={`Imagen ${index + 1}`}
             name={`${name}[${index}]`}
            />
          })}
        </div>


        <Button

          type='button'
          size={'sm'}
          variant='default'
          className='p-2 cursor-pointer'
          onClick={newImages}

        >

          Agregar Mas<FaPlus className='inline-block ml-2' />
        </Button>
      </div>

    </div>

  )
}
export default FormMultipleImages