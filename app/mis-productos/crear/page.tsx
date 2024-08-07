import FormInput from '@/components/myComponents/form/FormInput'
import FormContainer from '@/components/myComponents/form/FormContainer'
import { createProductoAction, updateProfileImageAction } from '@/utils/actions'
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


const CrearMisProductosPage = () => {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>
        crear producto nuevo
      </h1>

      <div className='border p-8 rounded-md'>

        <h3 className='text-lg mb-4 font-medium text-primary mt-4'>* Requerido: <span className='text-secondary-foreground ml-3'>Informacion del Producto</span></h3>
        <Separator orientation='horizontal' className=' mb-6' />





        <FormContainer action={createProductoAction}>

          <div className='grid md:grid-cols-2 gap-8 mb-4'>
            <FormInput
              name='nombre'
              type='text'
              label='* Nombre (50 letras maximo)'
              // defaultValue='Super Vegeta 28cm'
              placeholder='Super Vegeta 12 pulgadas'
            />
          </div>

          <div className='grid md:grid-cols-2 gap-8 mb-4'>
            <FormNumberInput name={'precioElevado'} labelName={'* Precio elevado, debe ser mayor que el precio real'} />
            <FormNumberInput name={'precio'} labelName={'* Precio Real ($) en dollares'} />

            <FormSelect label='* Categoria' name={'categoria'} list={categoria} />
          </div>

          <div className='grid md:grid-cols-1 gap-8 mb-4'>

            <FormInput
              name='tagline'
              type='text'
              label='* Tagline (120 letras maximo)'
              // defaultValue='Super Vegeta 28cm'
              placeholder='¡Añade poder a tu colección con esta impresionante figura de Vegeta en su icónico traje de Super Saiyajin! Detalles realistas.'
            />

            <TextAreaInput name={'descripcion'} labelText={'* Description (10-500 words)'} />
          </div>



          <h3 className='text-lg mb-4 font-medium text-primary mt-20'>Requerido: <span className='text-secondary-foreground ml-3'> Imagenes  del producto (Maximo 6)</span></h3>
          <Separator orientation='horizontal' className=' mb-6' />





          {/* <div className='grid md:grid-cols-2 gap-8 mb-4'>
            <ImageInput />
            <ImageInput />
          </div> */}




          <h3 className='text-lg mb-2 font-medium text-primary mt-20'>* Requerido: <span className='text-secondary-foreground ml-3'> Precio y Inventario  </span></h3>

          <h3 className='text-sm text-muted-foreground '>Seran usados para calcular tus ganancias y Tu inventario</h3>

          <Separator orientation='horizontal' className=' mb-6' />

          <div className='grid md:grid-cols-2 gap-8 mb-4'>
            <FormNumberInput name={'precioPagado'} labelName={'* Precio Pagado ($) en dollares por 1 articulo'} />
            <FormNumberInput name={'cantidad'} labelName={'* Cantidad disponible (#)'} />
          </div>




          <h3 className='text-lg mb-4 font-medium text-primary mt-20'>Opcional: <span className='text-secondary-foreground ml-3'> Tamaño y peso del producto</span></h3>
          <Separator orientation='horizontal' className=' mb-6' />

          <div className='grid md:grid-cols-2 gap-8 mb-4'>

            <FormNumberInput name={'ancho'} labelName={'ancho ($) en centimetros'} defaultValue={0} />
            <FormNumberInput name={'alto'} labelName={'alto ($) en centimetros'} defaultValue={0} />
            <FormNumberInput name={'largo'} labelName={'largo ($) en centimetros'} defaultValue={0} />
            <FormNumberInput name={'peso'} labelName={'peso ($) en libras'} defaultValue={0} />
          </div>


          <h3 className='text-lg mb-4 font-medium text-primary mt-20'>Opcional: <span className='text-secondary-foreground ml-3'> En especial y Disponibilidad</span></h3>
          <Separator orientation='horizontal' className=' mb-6' />



          <div className=' border px-4 py-6 grid grid-cols-1  gap-8 mb-4  w-fit rounded-md'>
            <FormCheckBox name={'onSale'} texto={"On sale - En Especial ?"} />
            <FormCheckBox name={'outOfStock'} texto={"Out of stock - No Esta Disponible ?"} />
          </div>


          <SubmitButton text='Crear Producto' className='mt-12' />

        </FormContainer>
      </div>

    </section>
  )
}
export default CrearMisProductosPage