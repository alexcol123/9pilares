'use client'

import { Button } from "@/components/ui/button"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import { useState } from "react";
import { FaImages } from "react-icons/fa";


const ProductImages = (imagenes: { imagenes: string[] }) => {

  const [viewMoreImages, setviewMoreImages] = useState(false)

  return (

    <div className="flex flex-col gap-4 items-center justify-center">




      {viewMoreImages && <div className="flex flex-col gap-4 items-center justify-center">
        {imagenes.imagenes.map((imagen, index) => {

          if (index === 0) return null
          return (

            <Image key={index}   src={imagen} width={600} height={600} alt={"imagen"} className="mb-6 object-cover" />

   
          )
        })}
      </div>}

      <Button variant={'outline'} className=" text-center bg-muted border border-primary rounded-full shadow-md"
        onClick={() => setviewMoreImages(!viewMoreImages)}
      >
        {!viewMoreImages ? <>  Ver Mas  Imagenes <FaImages size={18} className="text-primary ml-4"
        />   </> : 'Esconder imagenes'}




      </Button>

    </div>




  )
}
export default ProductImages


{/* <div className="flex flex-col gap-4 items-center justify-center">
{imagenes.imagenes.map((imagen, index) => {

  if (index === 0) return null
  return <div key={index} className="relative  h-[500px] w-[500px] aspect-square ">
    <Image
      src={imagen}
      alt={'imagen'}
      layout="fill"
      objectFit="cover"
    />

  </div>
})}
</div> */}