'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

function ImageInput({ labelName, name = 'image', multipleImages = false, inputName }: { labelName?: string, name?: string, multipleImages?: boolean, inputName?: string }) {




  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {labelName || "imagen"}
      </Label>

      <Input
        multiple={multipleImages}
        id={name}
        name={inputName}
        type='file'

        required
        accept='image/*'
        className='max-w-xs'
      />
    </div>
  )
}
export default ImageInput