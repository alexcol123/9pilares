
import { addMoreProductImagesAction, borrarUnaImagenAction, fetchProductoDetails, updateProductImagesAction } from '@/utils/actions'

import { Separator } from '@/components/ui/separator'

import MultipleImageInputContainer from '@/components/myComponents/form/MultipleImageInputContainer'
import { redirect } from 'next/navigation';
import Image from 'next/image';
import FormContainer from '@/components/myComponents/form/FormContainer';
import { IconButton } from '@/components/myComponents/form/Buttons';



const AgregarImagensPage = async ({ params }: { params: { id: string } }) => {
  const maximumImages: number = parseInt(process.env.MAXIMUN_IMAGES ?? '4');

  const product = await fetchProductoDetails(params.id)

  if (!product) {
    redirect('/')
  }

  const productId = product.id
  const currentImages = product.imagenes


  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>
        {`Agregar imagenes: " ${product.nombre} "`}
      </h1>



      <Separator orientation='horizontal' className=' mb-6' />

      <div className='border p-8 rounded-md'>

        <h3 className='text-lg mb-4 font-medium text-primary mt-4'>* Requerido: <span className='text-secondary-foreground ml-3'> Maximas imagenes {maximumImages}</span>
        </h3>


        <Separator orientation='horizontal' className=' mb-6' />
        <h3 className='text-lg font-semibold mb-8 capitalize'>
          Imagenes actuales
        </h3>

        <div className='grid  grid-cols-3  md:grid-cols-4 gap-6'>
          {currentImages.map((image: string, index: number) => (


            <div key={index} >
              <div className='w-fit'>
                <div className='relative'>
                  <Image width={200} height={200} src={image} alt='imagen' className='w-42 h-42 object-cover  rounded-md' />
                  <div className='absolute top-2 right-2 bg-primary-foreground/80 rounded-xl hover:bg-primary-foreground '>
                    <DeleteSingleImage ImageUrl={image} productId={productId} />
                  </div>
                </div>


              </div>
            </div>
          ))}
        </div>


        <Separator orientation='horizontal' className=' my-6' />

        <h3 className='text-2xl font-semibold mb-8 capitalize mt-10'>
          Nuevas Imagenes a agregar
        </h3>

        <MultipleImageInputContainer
          productId={params.id}
          maximumImages={maximumImages}
          name={'imagenes'}
          action={addMoreProductImagesAction}

        />

      </div>

    </section>

  )




}

const DeleteSingleImage = ({ ImageUrl, productId }: { ImageUrl: string, productId: string }) => {
  const deleteSingleImage = borrarUnaImagenAction.bind(null, { ImageUrl, productId })

  return (

    <FormContainer action={deleteSingleImage}>
      <IconButton actionType='delete' iconSize={20} />
    </FormContainer>

  )
}

export default AgregarImagensPage