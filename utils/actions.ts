'use server'

import { createReviewSchema, imageSchema, productoSchema, profileSchema, validateWithZodSchema } from './schemas'

import db from './db'
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { deleteImage, uploadImage } from './supabase'

// local functions 
const getAuthUser = async () => {
  const user = await currentUser()
  if (!user) {
    throw new Error('You must be logged in to access this route')
  }

  if (!user.privateMetadata.tienePerfil) {
    redirect('/perfil/crear')
  }

  return user
}

const renderError = (error: unknown): { message: string } => {
  console.log(error)
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
  }
}

// Exported functions



export const testingAction = async (prevState: any,
  formData: FormData) => {



  const firstName = formData.get('firstName') as string

  // create a 2 second delay to simulate a server request
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return { message: `Profile created for: ${firstName}`, }
}



export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {

    const user = await currentUser()
    if (!user) throw new Error('Please login to create a perfil')

    const rawData = Object.fromEntries(formData)

    // const validatedFields = profileSchema.parse(rawData)
    const validatedFields = validateWithZodSchema(profileSchema, rawData)

    await db.perfil.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        imagenPerfil: user.imageUrl ?? '',
        ...validatedFields,
      },
    })

    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        tienePerfil: true,
      },
    })

  } catch (error) {
    console.log(error)
    return { message: 'there was an error...' }
  }

  redirect('/')
}


export const fetchProfileImage = async () => {

  const user = await currentUser()
  if (!user) return null

  const perfil = await db.perfil.findFirst({
    where: { clerkId: user.id },
    select: { imagenPerfil: true },
  })

  return perfil?.imagenPerfil

}


export const fetchProfile = async () => {
  const user = await getAuthUser()

  const perfil = await db.perfil.findUnique({
    where: {
      clerkId: user.id,
    },
  })
  if (!perfil) return redirect('/perfil/create')
  return perfil
}


export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {


  const user = await getAuthUser()

  try {
    const rawData = Object.fromEntries(formData)

    const validatedFileds = profileSchema.parse(rawData)

    await db.perfil.update({
      where: { clerkId: user.id },
      data: validatedFileds,
    })

    revalidatePath('/perfil')
    return { message: 'Profile updated successfully' }

  } catch (error) {

    return renderError(error)
  }
}


export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser()
  try {
    const imagen1 = formData.get('imagen1') as File
    //  const rawData = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(imageSchema, { imagen1 })

    if (!validatedFields.imagen1) {
      throw new Error('No image found')
    }

    const fullPath = await uploadImage(validatedFields.imagen1)

    await db.perfil.update({
      where: {
        clerkId: user.id,
      },
      data: {
        imagenPerfil: fullPath,
      },
    })
    revalidatePath('/perfil')
    return { message: 'Imagen de perfil actualizada' }
  } catch (error) {
    return renderError(error)
  }
}
// Productos ============================================

export const updateProductImagesAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser()

  try {

    const productId = formData.get('productId') as string

    const rawData = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(imageSchema, rawData)

    const images = Object.values(validatedFields)

    const imagePaths = await Promise.all(images.map(uploadImage))
    // console.log(imagePaths)


    await db.producto.update({
      where: {
        id: productId,
        perfilId: user.id,
      },
      data: {
        imagenes: {
          set: imagePaths,
        },
      },
    })

    // revalidatePath(`/mis-productos/crear/imagenes/${productId}`)
    // return { message: 'Images Uploaded' }
  } catch (error) {
    return renderError(error)
  }

  redirect('/')
}


export const addMoreProductImagesAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser()

  try {

    const productId = formData.get('productId') as string

    const rawData = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(imageSchema, rawData)


    const images = Object.values(validatedFields)

    const imagePaths = await Promise.all(images.map(uploadImage))
    // console.log(imagePaths)


    await db.producto.update({
      where: {
        id: productId,
        perfilId: user.id,
      },
      data: {
        imagenes: {
          push: imagePaths
        }
      },
    })

    // revalidatePath(`/mis-productos/crear/imagenes/${productId}`)
    // return { message: 'Images Uploaded' }
  } catch (error) {
    return renderError(error)
  }

  redirect('/')
}



export const createProductoAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser()

  let productId: null | string = null

  try {
    const rawData = Object.fromEntries(formData)



    const validatedFields = validateWithZodSchema(productoSchema, rawData)

    // console.log(validatedFields)
    // return { message: 'Producto creado' }

    const producto = await db.producto.create({
      data: {
        ...validatedFields,
        perfilId: user.id,
      },
    })

    productId = producto.id

  } catch (error) {
    return renderError(error)
  }
  redirect(`/mis-productos/crear/imagenes/${productId}`)
}

export const fetchAllProducts = async ({ categoria, search = '' }: { categoria?: string, search?: string }) => {



  const productos = await db.producto.findMany(
    {
      where: {
        categoria: categoria,
        cantidad: {
          gt: 0,
        },
        // outOfStock: false,
        // cantidad: {
        //   gt: 0,
        // },
        OR: [
          {
            nombre: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            tagline: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },


      select: {
        id: true,
        nombre: true,
        tagline: true,
        descripcion: true,
        precio: true,
        precioElevado: true,
        categoria: true,
        imagenes: true,
        cantidad: true,

        onSale: true,
        outOfStock: true,


        Perfil: {
          select: {
            nombre: true,
            imagenPerfil: true,
          },
        },

      },
      orderBy: {
        createdAt: 'desc',
      },
    }
  )
  return productos
}

// Favoritos ============================================

export const fetchFavoriteId = async ({
  productoId,
}: {
  productoId: string
}) => {
  const user = await getAuthUser()

  const favorite = await db.favorito.findFirst({
    where: {
      productoId,
      perfilId: user.id,
    },
    select: {
      id: true,
    },
  })

  return favorite?.id || null
}


export const toggleFavoriteAction = async (prevState: {
  productoId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser()
  const { productoId, favoriteId, pathname } = prevState
  // console.log({ productoId, favoriteId, pathname })

  try {
    if (favoriteId) {
      await db.favorito.delete({
        where: { id: favoriteId }
      })
    } else {
      await db.favorito.create({
        data: {
          perfilId: user.id,
          productoId
        }
      })
    }

  } catch (error) {
    return renderError(error)

  }
  revalidatePath(pathname)
  return { message: favoriteId ? 'Removida de favoritos' : 'Agregado a tus Favoritos 🎉' }
}

export const fetchFavorites = async () => {
  const user = await getAuthUser()

  const favoritos = await db.favorito.findMany({
    where: {
      perfilId: user.id,
    },
    select: {
      Producto: {
        select: {
          id: true,
          nombre: true,
          tagline: true,
          descripcion: true,
          precio: true,
          precioElevado: true,
          categoria: true,
          imagenes: true,
          cantidad: true,

          onSale: true,
          outOfStock: true,


          Perfil: {
            select: {
              nombre: true,
              imagenPerfil: true,
            },
          },
        },
      },
    },
  })

  return favoritos.map((fav) => fav.Producto)
}


export const fetchUnProducto = async (productoId: string) => {

  const producto = await db.producto.findUnique({
    where: {
      id: productoId,

    },
    select: {
      id: true,
      nombre: true,
      tagline: true,
      descripcion: true,
      precio: true,
      precioElevado: true,
      categoria: true,
      imagenes: true,
      cantidad: true,

      onSale: true,
      outOfStock: true,

      alto: true,
      largo: true,
      ancho: true,
      perfilId: true,

      Perfil: {
        select: {
          nombre: true,
          imagenPerfil: true,

        },
      },

    },
  })

  return producto
}

// reviews

export async function createReviewAction(prevState: any, formData: FormData) {
  const user = await getAuthUser()
  try {
    const rawData = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(createReviewSchema, rawData)
    await db.review.create({
      data: {
        ...validatedFields,
        perfilId: user.id,
      },
    })
    revalidatePath(`/properties/${validatedFields.productoId}`)
    return { message: 'Review submitted successfully' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchProductReviews = async (productoId: string) => {
  const reviews = await db.review.findMany({
    where: {
      productoId,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      Perfil: {
        select: {
          nombre: true,
          imagenPerfil: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return reviews
}

export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser()
  const reviews = await db.review.findMany({
    where: {
      perfilId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      Producto: {
        select: {
          nombre: true,
          imagenes: true,
        },
      },
    },
  })
  return reviews
}

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState
  const user = await getAuthUser()

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        perfilId: user.id,
      },
    })

    revalidatePath('/reviews')
    return { message: ' Review removido ' }
  } catch (error) {
    return renderError(error)
  }
}

export const findExistingReview = async (
  userId: string,
  productoId: string
) => {
  return db.review.findFirst({
    where: {
      perfilId: userId,
      productoId: productoId,
    },
  })
}

export async function fetchProductRating(productId: string) {

  const result = await db.review.groupBy({
    by: ['productoId'],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productoId: productId,
    },

  })

  return {
    rating: result[0]?._avg.rating || 0,
    count: result[0]?._count.rating || 0,
  }

}




export const crearOrdenAction = async (prevState: {
  listaDeProductos: any[]
}) => {
  const user = await getAuthUser()
  const { listaDeProductos } = prevState


  let ordenId: null | string = null
  try {



    const productosSiendoComprados = await db.producto.findMany({
      where: {
        id: {
          in: listaDeProductos.map((producto) => producto.id,)
        },
        // return only products that are in stock

      },
      select: {
        id: true,
        precio: true,
        cantidad: true,
      },

    }

    )

    // to lista de productos overite the price, with  productosSiendoComprados
    listaDeProductos.forEach((producto) => {

      const productoSiendoComprado = productosSiendoComprados.find(
        (p) => p.id === producto.id
      )

      if (!productoSiendoComprado) {
        throw new Error('Producto no encontrado')
      }

      return producto.precioReal = productoSiendoComprado.precio
    })



    let subtotal = listaDeProductos.reduce(
      (acc, producto) => acc + (producto.precioReal * producto.cantidadParaComprar),
      0
    )

    // shiping cost // add if subtotal is under 50 add 10 shipping cost

    subtotal = subtotal > 50 ? subtotal : subtotal + 10

    const ordenData: {
      amount: number,
      perfilId: string,
      products: string,

    } = {
      amount: subtotal,
      perfilId: user.id,
      products: JSON.stringify(listaDeProductos),

    }


    const orden = await db.orden.create({
      data: ordenData
    })

    ordenId = orden.id


  } catch (error) {
    return renderError(error)

  }

  redirect(`/checkout?ordenId=${ordenId}`)
}


export const fetchOrdenes = async () => {
  const user = await getAuthUser()

  const borrarOrdenes = await db.orden.deleteMany({
    where: {
      paymentStatus: false,
      createdAt: {
        lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
      },
    },
  })



  const misOrdenes = await db.orden.findMany({
    where: {
      perfilId: user.id,
      paymentStatus: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return misOrdenes
}


export const borrarOrdenAction = async (prevState: { ordenId: string }) => {
  const { ordenId } = prevState
  const user = await getAuthUser()

  try {
    await db.orden.delete({
      where: {
        id: ordenId,
        perfilId: user.id,
      },
    })

    revalidatePath('/mis-compras')
    return { message: 'Orden eliminada exitosamente ' }
  } catch (error) {
    return renderError(error)
  }
}



export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState
  const user = await getAuthUser()

  try {
    await db.producto.delete({
      where: {
        id: productId,
        perfilId: user.id,
      },
    })

    revalidatePath('/mis-productos')
    return { message: 'Producto eliminado' }
  } catch (error) {
    return renderError(error)
  }
}

export const fetchMisProductos = async () => {
  const user = await getAuthUser()

  const misProductos = await db.producto.findMany({
    where: {
      perfilId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })


  // const productosConVentas = await db.producto.aggregate({
  //   where: {
  //     perfilId: user.id,
  //   },
  //   _count: {
  //     id: true,
  //   },
  //   _sum: {
  //     vendidos: true,
  //   },
  // })





  return misProductos

}





export const fetchMisVentas = async () => {
  const user = await getAuthUser()

  const misProductosConVentas = await db.producto.findMany({
    where: {
      perfilId: user.id,
      vendidos: {
        gt: 0,
      },
    },
    orderBy: {
      vendidos: 'desc',
    },
  })


  const ventasStats = await db.producto.aggregate({
    where: {
      perfilId: user.id,
    },
    _count: {
      id: true,
    },
    _sum: {
      vendidos: true,
    },
  })

  return { ventasStats, misProductosConVentas }

}



export const fetchProductoDetails = async (productoId: string) => {
  const user = await getAuthUser()

  const producto = await db.producto.findUnique({
    where: {
      id: productoId,
      perfilId: user.id,
    },
  })

  return producto
}



export const updateProductImageAction = async () => {
  return { message: 'Producto Imagen actualizado' }
}

export const updateProductAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser()

  let productId = formData.get('id') as string


  try {
    const rawData = Object.fromEntries(formData)




    const validatedFields = validateWithZodSchema(productoSchema, rawData)

    // console.log(validatedFields)
    // return { message: 'Producto creado' }

    const producto = await db.producto.update({
      where: {
        id: productId,
        perfilId: user.id,
      },
      data: {
        ...validatedFields,
        perfilId: user.id,
      },
    })

    productId = producto.id

  } catch (error) {
    return renderError(error)
  }
  redirect(`/mis-productos/crear/imagenesEdit/${productId}`)
}



export const borrarUnaImagenAction = async (prevState: { ImageUrl: string, productId: string }) => {
  const user = await getAuthUser()

const {ImageUrl, productId} = prevState

await deleteImage(ImageUrl)

  const productoImagenes = await db.producto.findUnique({
    where: {
      id: prevState.productId,
      perfilId: user.id,
    },
    select: {
      imagenes: true,
    },
  })

  const updatedImageList = productoImagenes?.imagenes.filter((img: string) => img !== ImageUrl) as string[]  // remove the image from the array


  try {

    await db.producto.update({
      where: {
        id: productId,
        perfilId: user.id,
      },
      data: {
        imagenes: {
          set: updatedImageList,
        },

      },
    })
    revalidatePath(`/mis-productos/crear/imagenesEdit/${productId}`)  // revalidate the page
    return { message: 'Imagen eliminada' }
  } catch (error) {
    return renderError(error)
  }
}