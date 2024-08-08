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
    <div className="grid  md:grid-cols-2 items-center justify-center gap-4 border-2 p-6 rounded-sm w-full my-2 ">
      <div className='mb-2 '>
        <Label htmlFor={name} className='capitalize'>
          {labelName || "imagen"}
        </Label>

        <Input
          id={name}
          name={inputName}
          type='file'
          required
          accept='image/*'
          className='max-w-xs'
          onChange={(e) => handleImageChange(e)}
        />
      </div>


      {imagePreview && (
        <div className="w-full mx-auto ">
          <Image
            src={imagePreview}
            width={100}
            height={100}
            className='rounded-md object-cover mb-4 w-32 h-24 mx-auto my-auto'
            alt='imagen'
          />
        </div>

      )}
    </div>


  )
}
export default ImageInputWithPreview

