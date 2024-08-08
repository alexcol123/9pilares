import FormInput from '@/components/myComponents/form/FormInput'
import FormContainer from '@/components/myComponents/form/FormContainer'
import {  updateProductImagesAction  } from '@/utils/actions'
import { SubmitButton } from '@/components/myComponents/form/Buttons'
import FormNumberInput from '@/components/myComponents/form/FormNumberInput'
import FormSelect from '@/components/myComponents/form/FormSelect'
import { categoria } from '@/utils/arrayLists'
import TextAreaInput from '@/components/myComponents/form/FormTextAreaInput'
import FormCheckBox from '@/components/myComponents/form/FormCheckBox'
import { Separator } from '@/components/ui/separator'
import ImageInput from '@/components/myComponents/form/ImageInput'
import FormMultipleImages from '@/components/myComponents/form/FormMultipleImages'
import ImageInputContainer from '@/components/myComponents/form/ImageInputContainer'
import MultipleImageInputContainer from '@/components/myComponents/form/MultipleImageInputContainer'



const AgregarImagensPage = ({ params }: { params: { id: string } }) => {
  const maximumImages: number = parseInt(process.env.MAXIMUN_IMAGES ?? '4');
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>
        agregar imagenes
      </h1>



      <div className='border p-8 rounded-md'>

        <h3 className='text-lg mb-4 font-medium text-primary mt-4'>* Requerido: <span className='text-secondary-foreground ml-3'>Agregar Imagenes Maximo {maximumImages}</span>
        </h3>

        <Separator orientation='horizontal' className=' mb-6' />

        <MultipleImageInputContainer
          maximumImages={maximumImages}
          name={'imagenes'}
          action={updateProductImagesAction}

        />

      </div>

    </section>
  )
}
export default AgregarImagensPage