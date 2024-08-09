import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { listaDeCategorias } from "@/utils/arrayLists"
import Image from "next/image"
import Link from "next/link"

const ListaDeCategorias = ({ categoria, search }: { categoria?: string, search: string }) => {

  const terminodDeBusqueda = search ? `&search=${search}` : ''



  return (
    <section>
      <ScrollArea className='py-6'>
        <div className='flex gap-x-4'>
          {listaDeCategorias.map((item) => {


            const isActive = item.name === categoria
            return (
              <Link key={item.name} href={`/?categoria=${item.name}${terminodDeBusqueda}`}>


                <article className='relative p-3 flex flex-col items-center cursor-pointer duration-300  w-[90px] md:w-[120px]  lg:w-[170px] xl:w-[220px] select-none'>

                  <div className={`absolute capitalize text-sm  border  top-0 bottom-0  transition left-0 right-0  dark:bg-black/60  bg-black/20  rounded-md px-2 hover:bg-black/40  ${isActive ? ' border-primary' : 'border-primary-foreground'}`}>

                    <div className="flex items-center justify-center h-full w-full text-[11px] font-semibold">
                      <p className={`absolute top-1 px-1  rounded ${isActive ? 'bg-primary text-primary-foreground' : 'bg-primary-foreground text-primary'} `}>
                        {item.name}</p>
                    </div>
                  </div>



                  <Image width={500} height={500} src={`/links/${item.imageName}`} alt={item.name} className="object-cover rounded-md  " />
                </article>



              </Link>



            )
          })}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </section>
  )
}
export default ListaDeCategorias