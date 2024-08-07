import FormInput from '@/components/myComponents/form/FormInput'
import FormContainer from '@/components/myComponents/form/FormContainer'
import { createProductoAction } from '@/utils/actions'
import { SubmitButton } from '@/components/myComponents/form/Buttons'
import FormNumberInput from '@/components/myComponents/form/FormNumberInput'
import FormSelect from '@/components/myComponents/form/FormSelect'
import { categoria } from '@/utils/arrayLists'
import TextAreaInput from '@/components/myComponents/form/FormTextAreaInput'


const CrearMisProductosPage = () => {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>
        crear producto nuevo
      </h1>

      <div className='border p-8 rounded-md'>
        <h3 className='text-lg mb-4 font-medium'>Informacion del Producto</h3>

        <FormContainer action={createProductoAction}>
          <div className='grid md:grid-cols-2 gap-8 mb-4'>
            <FormInput
              name='nombre'
              type='text'
              label='Nombre (50 letras maximo)'
              // defaultValue='Super Vegeta 28cm'
              placeholder='Super Vegeta 12 pulgadas'
            />

            <FormNumberInput name={'precio'} labelName={'precio ($) en dollares'} />






            {/* 
                  id          String   @id @default(uuid())
                  nombre      String
                  tagline     String
                  descripcion String
                  precio      Int
                  categoria   String
  imagenes    String[]

                    ancho Int @default(0)
                    alto  Int @default(0)
                    largo Int @default(0)
                    peso  Int @default(0)

  onSale    Boolean @default(false)
  descuento Int     @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  perfil   Perfil? @relation(fields: [perfilId], references: [clerkId], onDelete: Cascade)
  perfilId String? */}


          </div>


          <div className='grid md:grid-cols-1 gap-8 mb-4'>

            <FormInput
              name='tagline'
              type='text'
              label='Tagline (120 letras maximo)'
              // defaultValue='Super Vegeta 28cm'
              placeholder='¡Añade poder a tu colección con esta impresionante figura de Vegeta en su icónico traje de Super Saiyajin! Detalles realistas.'
            />
          </div>

          <TextAreaInput name={'description'} labelText={'Description (10-500 words)'} />



          <div className='grid md:grid-cols-2 gap-8 mb-4'>

            <FormSelect label='Categoria' name={'categoria'} list={categoria} />


          </div>


          <div className='grid md:grid-cols-2 gap-8 mb-4'>

            <FormNumberInput name={'ancho'} labelName={'ancho ($) en centimetros'} />
            <FormNumberInput name={'alto'} labelName={'alto ($) en centimetros'} />
            <FormNumberInput name={'largo'} labelName={'largo ($) en centimetros'} />
            <FormNumberInput name={'peso'} labelName={'peso ($) en libras'} />
          </div>

        </FormContainer>
      </div>

    </section>
  )
}
export default CrearMisProductosPage