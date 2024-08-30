import FormInput from '@/components/myComponents/form/FormInput'
import FormContainer from '@/components/myComponents/form/FormContainer'
import { updateProductAction, fetchProductoDetails, } from '@/utils/actions'
import { SubmitButton } from '@/components/myComponents/form/Buttons'
import FormNumberInput from '@/components/myComponents/form/FormNumberInput'
import FormSelect from '@/components/myComponents/form/FormSelect'
import { listaDeCategorias } from '@/utils/arrayLists'
import TextAreaInput from '@/components/myComponents/form/FormTextAreaInput'
import FormCheckBox from '@/components/myComponents/form/FormCheckBox'
import { Separator } from '@/components/ui/separator'
import ImageInput from '@/components/myComponents/form/ImageInput'
import FormMultipleImages from '@/components/myComponents/form/FormMultipleImages'
import ImageInputContainer from '@/components/myComponents/form/ImageInputContainer'
import { redirect } from 'next/navigation'


const EditarProductoPage = async ({ params }: { params: { id: string } }) => {

  const producto = await fetchProductoDetails(params.id)


  if (!producto) {
    redirect('/')
  }



  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>
        Editar producto: {producto.nombre}
      </h1>

      <div className='border p-8 rounded-md '>

        <h3 className='text-lg mb-4 font-medium text-primary mt-4'>* Requerido: <span className='text-secondary-foreground ml-3'>Informacion del Producto</span></h3>
        <Separator orientation='horizontal' className=' mb-6' />

        <FormContainer action={updateProductAction}  >

          <div className='grid md:grid-cols-2 gap-8 mb-4'>

            {/* Hidden input for ID*/}
            <input type='hidden' name='id' value={producto.id} />

            <FormInput
              name='nombre'
              type='text'
              label='* Nombre (50 letras maximo)'
              defaultValue={producto.nombre}
              placeholder='Super Vegeta 12 pulgadas'
            />
          </div>

          <div className='grid md:grid-cols-2 gap-8 mb-4'>
            <FormNumberInput name={'precioElevado'} labelName={'* Precio elevado, debe ser mayor que el precio real'} defaultValue={producto.precioElevado} />
            <FormNumberInput name={'precio'} labelName={'* Precio Real ($) en dollares'} defaultValue={producto.precio} />

            <FormSelect label='* Categoria' name={'categoria'} list={listaDeCategorias} defaultValue={producto.categoria} />
          </div>

          <div className='grid md:grid-cols-1 gap-8 mb-4'>

            <FormInput
              name='tagline'
              type='text'
              label='* Tagline (120 letras maximo)'
              // defaultValue='Super Vegeta 28cm'
              placeholder='¡Añade poder a tu colección con esta impresionante figura de Vegeta en su icónico traje de Super Saiyajin! Detalles realistas.'
              defaultValue={producto.tagline}
            />
            <TextAreaInput name={'descripcion'} labelText={'* Description (10-500 words)'} defaultValue={producto.descripcion} />
          </div>


          <h3 className='text-lg mb-2 font-medium text-primary mt-20'>* Requerido: <span className='text-secondary-foreground ml-3'> Precio y Inventario  </span></h3>

          <h3 className='text-sm text-muted-foreground '>Seran usados para calcular tus ganancias y Tu inventario</h3>

          <Separator orientation='horizontal' className=' mb-6' />

          <div className='grid md:grid-cols-2 gap-8 mb-4'>
            <FormNumberInput name={'precioPagado'} labelName={'* Precio Pagado ($) en dollares por 1 articulo'} defaultValue={producto.precioPagado} />
            <FormNumberInput name={'cantidad'} labelName={'* Cantidad disponible (#)'} defaultValue={producto?.cantidad || 0} />
          </div>

          <h3 className='text-lg mb-4 font-medium text-primary mt-20'>Opcional: <span className='text-secondary-foreground ml-3'> Tamaño y peso del producto</span></h3>
          <Separator orientation='horizontal' className=' mb-6' />

          <div className='grid md:grid-cols-2 gap-8 mb-4'>

            <FormNumberInput name={'ancho'} labelName={'ancho ($) en centimetros'} defaultValue={producto.ancho || 0} />
            <FormNumberInput name={'alto'} labelName={'alto ($) en centimetros'} defaultValue={producto.alto || 0} />
            <FormNumberInput name={'largo'} labelName={'largo ($) en centimetros'} defaultValue={producto.largo || 0} />
            <FormNumberInput name={'peso'} labelName={'peso ($) en libras'} defaultValue={producto.peso || 0} />
          </div>


          <h3 className='text-lg mb-4 font-medium text-primary mt-20'>Opcional: <span className='text-secondary-foreground ml-3'> En especial y Disponibilidad</span></h3>
          <Separator orientation='horizontal' className=' mb-6' />


          <div className=' border px-4 py-6 grid grid-cols-1  gap-8 mb-4  w-fit rounded-md'>
            <FormCheckBox name={'onSale'} texto={"On sale - En Especial ?"} />
            <FormCheckBox name={'outOfStock'} texto={"Out of stock - No Esta Disponible ?"} />
          </div>

          <SubmitButton text='Actualizar  Producto' className='mt-12' />

        </FormContainer>
      </div>

    </section>
  )
}
export default EditarProductoPage