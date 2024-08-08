import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ImageInput({ labelName, name = 'image', multipleImages = false }: { labelName?: string, name?: string, multipleImages?: boolean }) {

  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {labelName || "imagen"}
      </Label>

      <Input
        multiple={multipleImages}
        id={name}
        name={name}
        type='file'
        required
        accept='image/*'
        className='max-w-xs'
      />
    </div>
  )
}
export default ImageInput