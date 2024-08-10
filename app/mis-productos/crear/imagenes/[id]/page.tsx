
import { updateProductImagesAction } from '@/utils/actions'

import { Separator } from '@/components/ui/separator'

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
          productId={params.id}
          maximumImages={maximumImages}
          name={'imagenes'}
          action={updateProductImagesAction}

        />

      </div>

    </section>
  )
}
export default AgregarImagensPage