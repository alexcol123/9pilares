import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { FaHome } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";




const BreadCrumbs = ({nombre}:{nombre:string}) => {
  return (
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">

<div className='flex items-center justify-center gap-2'>
<FaHome size={22} className="ml-1" />
<span>Inicio</span>

</div>
      </BreadcrumbLink>
    </BreadcrumbItem>
    
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>{nombre}</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

  )
}
export default BreadCrumbs