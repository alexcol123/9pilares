'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image";
import { useEffect, useState } from "react";

function ImageInputWithPreview({ labelName, name = 'image', inputName }: { labelName?: string, name?: string, inputName?: string }) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const objectURL = URL.createObjectURL(file);
      setImagePreview(objectURL);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="grid  grid-cols-1 sm:grid-cols-2 items-center justify-center gap-4 border-2 p-2 rounded-sm w-full my-2 ">
      <div className=' m-2  md:m-4  '>
        <Label htmlFor={name} className='capitalize'>
          {labelName || "imagen"}
        </Label>

        <Input
          id={name}
          name={inputName}
          type='file'
          required
          accept='image/*'
          className='max-w-sm  mt-2 aspect-[4/5] object-cover border bg-muted px-4'
          onChange={(e) => handleImageChange(e)}
        />
      </div>


      {imagePreview && (
        <div className="w-full mx-auto ">
          <Image
            src={imagePreview}
            width={120}
            height={150}
            className='rounded-md object-cover mb-1 mx-auto my-auto aspect-[4/5]'
            alt='imagen'
          />
        </div>

      )}
    </div>


  )
}
export default ImageInputWithPreview

