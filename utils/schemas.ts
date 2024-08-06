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

