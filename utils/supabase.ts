import { createClient } from '@supabase/supabase-js'

const bucket = '9pilares'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
)

export const uploadImage = async (image: File) => {
  const timestamp = Date.now()
  // const newName = `/users/${timestamp}-${image.name}`;
  const newName = `${timestamp}-${image.name}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, {
      cacheControl: '3600',
    })
  if (!data) throw new Error('Image upload failed')
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl
}

export const deleteImage = async (imageUrl: string) => {
  console.log('------------------------------------')
  console.log(imageUrl)
  const fileName = imageUrl.split('/').slice(-1)[0]

  console.log(fileName)
  console.log('=======================================================================================')
  const resp  = await supabase.storage.from(bucket).remove([fileName])

  console.log(resp)

}
