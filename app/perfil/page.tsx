import { SubmitButton } from "@/components/myComponents/form/Buttons"
import FormContainer from "@/components/myComponents/form/FormContainer"
import FormInput from "@/components/myComponents/form/FormInput"
import ImageInputContainer from "@/components/myComponents/form/ImageInputContainer"
import { fetchProfile, fetchProfileImage, updateProfileAction, updateProfileImageAction } from "@/utils/actions"

const PerfilPage = async () => {
  const profile = await fetchProfile()

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>user profile</h1>
      <div className='border p-8 rounded-md'>
        {/* image input container */}



        <ImageInputContainer
          image={profile.imagenPerfil}
          name={profile.nombre}
          action={updateProfileImageAction}
          text='Actualizar imagen de perfil'
        />

        <FormContainer action={updateProfileAction}>
          <div className='grid gap-4 md:grid-cols-2 mt-4 '>


            <FormInput type='text' name='nombre' label='nombre' defaultValue={profile.nombre} />
            <FormInput type='text' name='apellido' label='apellido' defaultValue={profile.apellido} />
            <FormInput type='text' name='usuario' label='usuario' defaultValue={profile.usuario} />

          </div>
          <SubmitButton text='Update Profile' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  )

}
export default PerfilPage