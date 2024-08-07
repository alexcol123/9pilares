import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type TextAreaInputProps = {
  name: string
  labelText?: string
  defaultValue?: string
}

function TextAreaInput({ name, labelText, defaultValue }: TextAreaInputProps) {

  const tempDefaultDescription =

    'En nuestra tienda encontrarás figuras de One Piece, Dragon Ball y Demon Slayer y mas, fabricadas con excelente calidad y gran atención al detalle. Cada figura captura perfectamente la esencia de tus personajes favoritos, desde sus expresiones hasta sus icónicos trajes. Ideales para coleccionistas y fans, estas figuras son perfectas para exhibir en tu estantería, escritorio o vitrina. Añade a tus héroes de anime a tu colección y revive sus épicas aventuras todos los días.'

  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={defaultValue || tempDefaultDescription}
        rows={5}
        required
        className='leading-loose mt-1'
      />
    </div>
  )
}


export default TextAreaInput


