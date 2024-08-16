import Image from "next/image"
import ImagenesCarousel from "./ImagenesCarousel"


const ContenedorImagen = ({ imagenes, nombre }: { imagenes: string[], nombre: string }) => {


  return (
    <section className="m-4">
      {/* <Image src={imagenes[0]} fill sizes='100vw' alt={nombre} className=" aspect-square object-cover " priority /> */}


      <ImagenesCarousel images={imagenes} nombre={nombre} />

    </section>
  )
}
export default ContenedorImagen