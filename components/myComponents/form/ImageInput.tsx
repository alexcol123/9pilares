'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image";
import { useEffect, useState } from "react";

function ImageInput({ labelName, name = 'image',  inputName }: { labelName?: string, name?: string, inputName?: string }) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

console.log(imagePreview)

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
    <div className='mb-2'>
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
        onChange={(e)=>handleImageChange(e)}
      />


      {imagePreview && (
        <Image 
          src={imagePreview}
          width={100}
          height={100}
          className='rounded-md object-cover mb-4 w-24 h-24'
          alt='imagen'
        />

      )}  
    </div>

    
  )
}
export default ImageInput


// 'use client'

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useState } from "react";

// function ImageInput({ labelName, name = 'image', multipleImages = false, inputName }: { labelName?: string, name?: string, multipleImages?: boolean, inputName?: string }) {




//   return (
//     <div className='mb-2'>
//       <Label htmlFor={name} className='capitalize'>
//         {labelName || "imagen"}
//       </Label>

//       <Input
   
//         multiple={multipleImages}
//         id={name}
//         name={inputName}
//         type='file'

//         required
//         accept='image/*'
//         className='max-w-xs'
//       />
//     </div>
//   )
// }
// export default ImageInput