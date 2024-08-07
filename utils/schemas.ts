import * as z from 'zod'
import { ZodSchema } from 'zod'

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message)

    throw new Error(errors.join(', '))
  }
  return result.data
}

export const profileSchema = z.object({
  // firstName: z.string().max(5, { message: 'max length is 5' }),
  nombre: z.string(),
  apellido: z.string(),
  usuario: z.string(),

})



function validateFile() {
  const maxUploadSize = 1024 * 1024
  const acceptedFileTypes = ['image/']
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize
    }, `File size must be less than 1 MB`)
    .refine((file) => {
      return (

        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      )
    }, 'File must be an image')
}

export const imageSchema = z.object({
  image: validateFile()

})


export const productoSchema = z.object({
  nombre: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
    .max(50, { message: 'El nombre debe tener menos de 50 caracteres.' }),

  tagline: z
    .string()
    .min(2, { message: 'El tagline debe tener al menos 2 caracteres.' })
    .max(120, { message: 'El tagline debe tener menos de 120 caracteres.' }),
    
  descripcion: z.string().refine(
    (description) => {
      const palabras = description.split(' ').length
      return palabras >= 10 && palabras <= 1000
    },
    {
      message: 'La descripción debe tener entre 10 y 1000 palabras.',
    }
  ),
  precio: z.coerce.number().int().min(1, {
    message: 'El precio debe ser mayor o igual a 1.',
  }),
  categoria: z.string(),
  // imagenes: z.array(z.string()),
  ancho: z.coerce.number().int().min(0, {
    message: 'El ancho debe ser mayor o igual a 0 centimetros.',
  }),
  alto: z.coerce.number().int().min(0, {
    message: 'El alto debe ser mayor o igual a 0 centimetros.',
  }),

  largo: z.coerce.number().int().min(0, {
    message: 'El largo debe ser mayor o igual a 0 centimetros.',
  }),
  peso: z.coerce.number().int().min(0, {
    message: 'El peso debe ser mayor o igual a 0 libra.',
  }),
  onSale: z.boolean(),
  descuento: z.coerce.number().int().min(0, {
    message: 'El descuento debe ser mayor o igual a 0.',
  }),


})