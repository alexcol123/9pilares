import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ImageInput({ labelName, name = 'image' }: { labelName?: string, name?: string }) {

  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {labelName || "imagen"}
      </Label>

      <Input
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